import axios from "axios";
import { Label, TextInput, Button, List } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import useFetchLogs from "./useFetchLogs";

export const WebAddress = () => {
  const inputRef = useRef();
  const { control, watch } = useFormContext();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const [start, setStart] = useState<boolean>();

  const watchWebAddress = watch("web_address");

  useEffect(() => {
    if (start) {
      const fetchData = async () => {
        try {
          const response = await axios.get<any>(
            `https://api-portal-dev.everesteffect.com/provision-logs?provider_name=${watchWebAddress}&bucket_name=ee-provision-dev`
          );
          setData(response.data);
          console.log(response.data);
          console.log(
            response.data.log_content.some((entry: any) =>
              entry.event.includes("[3]")
            )
          );

          if (
            response.data.log_content.some((entry: any) =>
              entry.event.includes("Clean up")
            )
          ) {
            setStart(false);
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };

      fetchData(); // Initial fetch

      const intervalId = setInterval(() => {
        fetchData();
      }, 16000); // 16 seconds

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [start]);

  const provisionFunc = async () => {
    try {
      const res = await fetch(
        "https://api-portal-dev.everesteffect.com/provision",
        {
          method: "POST",
          mode: "no-cors", // Set to 'no-cors' to disable CORS handling
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${watchWebAddress}-execution-aug-14-2024`,
            input: `{"hostname": "${watchWebAddress}", "build_id": "${watchWebAddress}_${watchWebAddress}_v.1.0.0_dev"}`,
          }),
        }
      );

      if (res) {
        setStart(true);
      }

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Label className="mb-2 block">Host Name</Label>
      <div className="flex gap-x-4">
        <Controller
          control={control}
          name="web_address"
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <TextInput
              ref={inputRef as any}
              color="primary"
              placeholder="domain.everesteffect.com"
              className="w-[450px] placeholder-shown:italic "
              value={value}
              onKeyPress={(e) => {
                e.persist();

                if (!/^(\d|\w)+$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={onChange}
            />
          )}
        />
        <Button color="primary" onClick={provisionFunc}>
          Provision
        </Button>
      </div>
      <div className="text-sm mt-2 ml-2 text-black">
        {watchWebAddress && (
          <div>
            Your provision link:
            <strong>{`${watchWebAddress}.everesteffect.com`}</strong>
          </div>
        )}
      </div>

      {data && (
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-4 text-black">
            Provision Log Content
          </h3>
          <List>
            {data?.log_content.map((item: any, index: any) => (
              <List.Item key={index}>{item.event}</List.Item>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};
