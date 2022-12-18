import axios from "axios";
import { useEffect, useState } from "react";

function RecvLinks() {
  const [recvFrom, setRecvFrom] = useState();
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local
      .get(["authToken"])
      .then((token) => {
        const headers = { authorization: `Bearer ${token.authToken}` };
        axios
          .get("https://qgmucqaljwipbdatwznn.functions.supabase.co/all-links", {
            headers,
          })
          .then((res) => {
            console.log(res.data.to);
            setRecvFrom(res.data.to);
          });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex flex-col gap-2 text-white mx-4 overflow-y-scroll h-[370px] mt-[10px]">
      {recvFrom &&
        recvFrom.map((item, i) => {
          return (
            <div
              className="flex flex-col justify-between text-sm border-[0.5px] border-[#121212] font-thin my-1 p-2 hover:border-[0.5px] hover:border-[#1D1D1D] hover:cursor-pointer duration-200"
              key={i}
            >
              <div className="py-1 text-pink-500 font-medium">{item.from}</div>

              <div className="py-1 text-gray-400 overflow-hidden hover:text-gray-100">
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.url}
                </a>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default RecvLinks;
