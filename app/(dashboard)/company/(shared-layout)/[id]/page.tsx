import CompanyDetail from "../components/company-detail";

const Page = async function (props: { params: { id: string } }) {
  const response = await fetch(
    `http://localhost:3000/api/company/${props?.params?.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["company_details"],
        revalidate: 0,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch company ${props?.params.id}`);
  }

  const data = await response.json();

  return <CompanyDetail companyInfo={data} />;
};

export default Page;
