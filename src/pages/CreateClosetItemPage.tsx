import React, {useState, useRef} from 'react';
import {createClosetItem} from '../api
import {Input} from "../components/ui/input.tsx"
import {Button} from "../components/ui/button.tsx"
import {Label} from "../components/ui/label.tsx"
//import {Textarea} from "../components/ui/textarea.tsx"


export const CreateClosetItemPage: React.FC = () => {
  const [category, setCategory] = useState("")
  const [name, setName] = useState('')
  const [season, setSeason] = useState('')
  const [size, setSize] = useState('')
  const [desc, setDesc] = useState('')
  const [rating, setRating] = useState('')
  //const [file, setFile] = useState()

  //const inputFile = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault();
    let submitObject = {
      category:category,
      name:name,
      season:season,
      size:size,
      desc:desc,
      rating, rating
      //file:file
    }

  await createClosetitem(submitObject)
   }

  //  function handleFileUpload(e) {
  //   const file = e.target.files[0];
  //   const fileExtension = file.name.substring(file.name.lastIndexOf('.'))
  //   if (fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".png"){
  //     alert("Files must be jpg or png")
  //     inputFile.current.value = ""
  //     inputFile.current.type = "file"
  //     return
  //   }
  //   setFile(file);
  //  }

  return(
    <form onSubmit={handleSubmit} className='w-1/3'>
      <Label className='flex left-0 p-2'>Closetitem Category: </Label>
      <Input onChange={(e) => setCategory(e.target.value)} maxLength={40} required name="category"/>
      <Label className='flex left-0 p-2'>Closetitem Name: </Label>
      <Input onChange={(e) => setName(e.target.value)} maxLength={40} required name="name"/>
      <Label className='flex left-0 p-2'>Closetitem Category: </Label>
      <Input onChange={(e) => setSeason(e.target.value)} maxLength={40} required name="season"/>
      <Label className='flex left-0 p-2'>Closetitem Category: </Label>
      <Input onChange={(e) => setSize(e.target.value)} maxLength={40} required name="size"/>
      <Label className='flex left-0 p-2'>Closetitem Category: </Label>
      <Input onChange={(e) => setDesc(e.target.value)} maxLength={40} required name="desc"/>
      <Label className='flex left-0 p-2'>Closetitem Category: </Label>
      <Input onChange={(e) => setRating(e.target.value)} maxLength={40} required name="rating"/>
      {/* <Label className='flex left-0 p-2'>Item Image: </Label>
      <input type="file" onChange={handleFileUpload} ref={inputFile} className='cursor-pointer hover:bg-accent' required /> */}
      <Button type="submit" className="mt-4">Submit</Button>
    </form>
  )
};


category: {
    type: String,
    required: true,
  },
  name:{
    type:String,
    required:true,
  },
  season: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },