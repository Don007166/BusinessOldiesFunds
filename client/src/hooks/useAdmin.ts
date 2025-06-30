import { useQuery } from "@tanstack/react-query";

export function useAdmin() {
  const { data: admin, isLoading } = useQuery({
    queryKey: ["/api/admin/user"],
    retry: false,
  });

  return {
    admin,
    isLoading,
    isAuthenticated: !!admin,
  };
}
