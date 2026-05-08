import { Navigate } from "react-router-dom";

// Sign in temporarily disabled — redirect to the simple chef-name flow.
export default function Signin() {
  return <Navigate to="/signup" replace />;
}
