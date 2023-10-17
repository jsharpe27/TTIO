import Header from "@/components/Header";

const RootLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {

  return ( 
    <div className="h-full w-full">
      <Header/>
      <main className="h-full">
        {children}
      </main>
    </div>
   );
}
 
export default RootLayout;