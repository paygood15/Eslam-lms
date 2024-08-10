import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config("");

export default defineConfig({
  define: {
    REACT_APP_API_URL: `"${process.env.REACT_APP_API_URL}"`, // wrapping in "" since it's a string
  },
  plugins: [react()],
});

