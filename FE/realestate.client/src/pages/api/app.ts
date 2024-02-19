export async function getServerSideProps(context: any) {
    const res = await fetch("/api/get-cookie"); // Call custom API
    const data = await res.json();
    const { token } = data;
  
    // Use returned data (e.g., token)
  
    return {
      props: {
        token,
      },
    };
  }
  