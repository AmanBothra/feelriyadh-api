export interface AboutTypes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  id: number;
  content: string;
  content_en: string;
  content_ar: string;
  mobile_number: string;
  mobile_number_en: string;
  mobile_number_ar: string;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  address: string;
  address_en: string;
  address_ar: string;
}
