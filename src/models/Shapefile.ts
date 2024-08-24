import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Define the Shapefile interface extending Document
export interface IShapefile extends Document {
  name: string;
  photo: string;
  id: string;
  geojson: any; // GeoJSON is typically an object, you can use `any` or define a more specific type if needed
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the Shapefile Schema
const ShapefileSchema: Schema<IShapefile> = new Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    geojson: { type: Schema.Types.Mixed, required: true }, // Storing GeoJSON as an object
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create and export the Shapefile model
const Shapefile: Model<IShapefile> = mongoose.models.Shapefile || model<IShapefile>('Shapefile', ShapefileSchema);

export default Shapefile;
