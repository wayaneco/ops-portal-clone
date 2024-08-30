"use client";

import { useState, useEffect, memo } from "react";
import { UserDetailType } from "@/app/types";
import { UserListTable } from "./user-list-table";
import { createClient } from "@/utils/supabase/client";
import { ROLE_NETWORK_ADMIN } from "@/app/constant";

// eslint-disable-next-line react/display-name
export const UserListWrapper = memo(
  ({ data }: { data: Array<UserDetailType> }) => {
    const supabase = createClient();

    const [users, setUsers] = useState<Array<UserDetailType>>(data || []);
    const [isRefetch, setIsRefetch] = useState<boolean>(false);

    const getUsers = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data: is_role_network_admin, error: error_is_network_admin } =
          await supabase.rpc("has_admin_role", {
            p_role_name: ROLE_NETWORK_ADMIN,
            p_user_id: user?.id,
          });

        if (error_is_network_admin) throw error_is_network_admin;

        const { data, error } = await supabase
          .from(
            is_role_network_admin
              ? "users_data_view"
              : "users_data_view_without_network_admin_role"
          )
          .select(
            `user_id, first_name, middle_name, last_name, email, clients`
          );

        if (error) throw error;

        console.log({ fromFUNC: data });
        setUsers(data as Array<UserDetailType>);
        setIsRefetch(false);
      } catch (error) {
        setIsRefetch(false);
        return error;
      }
    };

    useEffect(() => {
      if (isRefetch) {
        getUsers();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRefetch]);

    return (
      <>
        <UserListTable data={users} refetch={() => setIsRefetch(true)} />
      </>
    );
  }
);
