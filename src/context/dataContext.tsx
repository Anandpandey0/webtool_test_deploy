import { createContext, Dispatch, SetStateAction } from "react";

// Define the shape of the targetedArea
export interface Geometry {
  type: "Polygon";
  coordinates: number[][][];
}

export interface Properties {
  farm_id: string;
  "2022_Rabi": number;
  "2023_Kharif": number;
  "2023_Rabi": number;
  "2024_Kharif": number;
  ABR: string;
  AREA_AS_PE: number;
  CROP_TYPE: string;
  DISTRICT: string;
  FATHER_NAM: string;
  FORMER_NAM: string;
  GATA_NO: number;
  IRRIGATION: string;
  PARTATION_: number;
  SHAPE_Area: number;
  SHAPE_Leng: number;
  SUB_GATA: string;
  TEHSEEL: string;
  VILLAGE_CO: number;
  VILLAGE_NA: string;
  area_polyg: number;
  [key: string]: string | number | undefined; // Allow additional dynamic keys
}


export interface TargetedArea {
  type: "Feature";
  properties: Properties;
  geometry: Geometry;
}

// Define the shape of the context's data
interface DataContextType {
  targetedArea: TargetedArea | null;
  setTargetedArea: Dispatch<SetStateAction<TargetedArea | null>>;

  userDetail: any;
  setUserDetail: Dispatch<SetStateAction<any>>;

  selectedFarm: any[];
  setSelectedFarm: Dispatch<SetStateAction<any[]>>;

  targetedSeason: string;
  setTargetedSeason: Dispatch<SetStateAction<string>>;

  targetedYear: string;
  setTargetedYear: Dispatch<SetStateAction<string>>;

  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

// Create the initial context with appropriate default values
const initialContext: DataContextType = {
  targetedArea: null,
  setTargetedArea: () => {},

  userDetail: null,
  setUserDetail: () => {},

  selectedFarm: [],
  setSelectedFarm: () => {},

  targetedSeason: "",
  setTargetedSeason: () => {},

  targetedYear: "",
  setTargetedYear: () => {},

  showPopup: false,
  setShowPopup: () => {},
};

const dataContext = createContext<DataContextType>(initialContext);

export default dataContext;
