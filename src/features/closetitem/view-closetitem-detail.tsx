// import { getClosetitem } from './closetitem-api.ts';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// //import type { Closetitem } from '../../interfaces/Interfaces.tsx';

// interface ImageData {
//   data: string;
// }

// interface ClosetitemDetails {
//   id: string;
//   category: string;
//   itemName: string;
//   season: string;
//   size: string;
//   desc: string;
//   rating: string;
//   imageId: string;
//   imageFile: ImageData;
// }

// export const ViewClosetitemDetailPage: React.FC = (): React.JSX.Element => {
//   const { id } = useParams<{ id: string }>();
//   const [closetitem, setClosetitem] = useState<ClosetitemDetails | null>(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     async function loadClosetitem() {
//       if (id == undefined) {
//         console.log('id is undefined');
//         return;
//       }
//       let data = await getClosetitem(id);
//       // let date = new Date(data.dateCreated);
//       // data.dateCreated = date.toString();
//       if (data) {
//         setClosetitem(data);
//       } else {
//         return;
//       }
//     }
//     loadClosetitem();
//   }, []);

//   return (
//     <div className="flex flex-col items-center w-1/3">
//       <Button onClick={() => navigate(-1)} className="w-48 my-4">
//         Back
//       </Button>
//       <div className="flex w-full justify-center">
//         <img src={closetitem?.imageFile?.data} className="max-h-96 my-4" />
//       </div>
//       <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">
//         Name: {closetitem?.itemName}
//       </h1>
//       <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
//         Category: {closetitem?.category}
//       </h3>
//       <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
//         Season: {closetitem?.season}
//       </h3>
//       <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
//         Size: {closetitem?.size}
//       </h3>
//       <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
//         Desc: {closetitem?.desc}
//       </h3>
//       <h3 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
//         Rating: {closetitem?.rating}
//       </h3>
//       <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         DateCreated: {closetitem?.dateCreated?.slice(4, 15)}
//       </h3>
//     </div>
//   );
// };
