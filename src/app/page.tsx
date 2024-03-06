import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/onboarding");

  // return <Container tag={"article"}>Home</Container>;
}
