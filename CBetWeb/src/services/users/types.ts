export interface User {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string | null;
  token: string | null;
  countryId: number | null;
  phoneNumber: string | null;
  thirdParty: boolean;
  id: number | null;
}
