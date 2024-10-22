import ListofPost from "@/components/list-of-post";

export default function Home() {
  return (
    <>
        <ListofPost candidates={[]} onSearchTextUpdate={function (text: string): void {
        throw new Error("Function not implemented.");
      } } onFindCandidates={function (): void {
        throw new Error("Function not implemented.");
      } }/>
    </>
  );
}
