import React, { useState } from 'react';

import { InputField, Button } from 'shared/components';

type MovieFormData =
  & Record<"title" | "description" | "imageUrl", string>
  & Record<"director" | "starring", string[]>
  & Record<"duration" | "year", number>

  interface AddMovieFormProps {
    onSubmit: (data: MovieFormData) => void,
    onCancel: () => void,
}

export function AddMovieForm({ onSubmit, onCancel }: AddMovieFormProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [starring, setStarring] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // TODO: Implement form for adding a movie

  return (
    <form className="p-4 ">
      {/* TODO: Add code to make form actions work */}
      <InputField name="Url"  value={imageUrl} setter={setImageUrl}/>
      <InputField name="Title" value={title} setter={setTitle} />
      <InputField name="Duration" value={duration} setter={setDuration}/>
      <InputField name="Year" value={year} setter={setYear} />
      <InputField name="Director" value={director} setter={setDirector}/>
      <InputField name="Starring" value={starring} setter={setStarring}/>
      <InputField name="Description" value={description} setter={setDescription}/>
      <div className="text-center">
      <Button onClick={() => {
        if(title == "" || description == "" || imageUrl == "" || duration == "" || year == "" || director == "" || starring == ""){
          return
        }
        let payload: MovieFormData = {
          title,  
          description, 
          imageUrl,
          duration :Number(duration),
          year:Number(year),
          director :director.split(','),
          starring:starring.split(','),
        }
        onSubmit(payload);
      }}>
        Submit
      </Button>
      <Button onClick={onCancel}>
        Cancel
      </Button>
      </div>
    </form>
  );
}
