import React, { useState, useEffect } from "react";

//Dynamic import
//Write other version ?? with URL !

export default function useGetimage(directory) {
  const [loading, setLoading] = useState(true);
  const [filesInfo, setFilesInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const filesArray = [];
      const callApi = async (folder) => {
        const bodyRequest = {
          dir: `assets/img/${folder}`,
        };

        const res = await fetch("/api/readFiles", {
          method: "POST",
          body: JSON.stringify(bodyRequest),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        try {
          const allFiles = await res.json();
          for (const f of allFiles) {
            const i = await import(`/public/assets/img/${folder}${f}`);
            filesArray.push(i.default);
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      for (const folder of directory) {
        await callApi(folder);
      }
      setFilesInfo(filesArray);
    };
    fetchData();
  }, []);

  return [filesInfo, loading];
}
