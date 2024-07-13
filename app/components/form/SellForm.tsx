"use client";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCategory from "../SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { sellProduct, type State } from "@/app/actions";
import { useEffect, useState } from "react";
import { type JSONContent } from "@tiptap/react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { UploadDropzone } from "@/app/utils/uploadthing";
import TipTapEditor from "../Editor";
import SubmitButtons from "../SubmitButtons";

const SellForm = () => {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(sellProduct, initialState);

  // TIPTAP EDITOR
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Sell your artworks with ease</CardTitle>
          <CardDescription>
            Describe your artwork in details here{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-10">
          {/* NAME */}
          <div className="flex flex-col gap-y-2">
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Name of your Artwork"
              name="name"
              required
              minLength={3}
            />
            {state?.errors?.["name"]?.[0] && (
              <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
            )}
          </div>
          {/* CATEGORY */}
          <div className="flex flex-col gap-y-2">
            <Label>Category</Label>
            <SelectCategory />
            {state?.errors?.["category"]?.[0] && (
              <p className="text-destructive">
                {state?.errors?.["category"]?.[0]}
              </p>
            )}
          </div>
          {/* PRICE */}
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              placeholder="588 Tk"
              type="number"
              name="price"
              required
              min={1}
            />
            {state?.errors?.["price"]?.[0] && (
              <p className="text-destructive">
                {state?.errors?.["price"]?.[0]}
              </p>
            )}
          </div>
          {/* SHORT DESCRIPTION */}
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Short Summery your artwork"
              name="smallDescription"
              required
              minLength={10}
            />
            {state?.errors?.["smallDescription"]?.[0] && (
              <p className="text-destructive">
                {state?.errors?.["smallDescription"]?.[0]}
              </p>
            )}
          </div>
          {/* LONG DESCRIPTION */}
          <div className="flex flex-col gap-y-2">
            <input
              type="hidden"
              name="description"
              value={JSON.stringify(json)}
            />
            <Label>Long Description</Label>
            <TipTapEditor json={json} setJson={setJson} />
            {state?.errors?.["description"]?.[0] && (
              <p className="text-destructive">
                {state?.errors?.["description"]?.[0]}
              </p>
            )}
          </div>
          {/* IMAGES */}
          <div className="flex flex-col gap-y-2">
            <input type="hidden" name="images" value={JSON.stringify(images)} />
            <Label>Image</Label>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImages(res.map((item) => item.url));
                toast.success("your images have been uploaded");
              }}
              onUploadError={(error: Error) => {
                // throw new Error(`${error}`);
                toast.error("Something went wrong, try again!");
              }}
            />
            {state?.errors?.["images"]?.[0] && (
              <p className="text-destructive">
                {state?.errors?.["images"]?.[0]}
              </p>
            )}
          </div>
          {/* PRODUCT FILE */}
          <div className="flex flex-col gap-y-2">
            <input type="hidden" name="productFile" value={productFile ?? ""} />
            <Label>Product File</Label>

            <UploadDropzone
              endpoint="productFile"
              onClientUploadComplete={(res) => {
                setProductFile(res[0].url);
                toast.success("your product file has been uploaded");
              }}
              onUploadError={(error: Error) => {
                toast.error("Something went wrong, try again!");
              }}
            />
            {state?.errors?.["productFile"]?.[0] && (
              <p className="text-destructive">
                {state?.errors?.["productFile"]?.[0]}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="mt-5">
          <SubmitButtons title="Create your product" />
        </CardFooter>
      </form>
    </div>
  );
};

export default SellForm;
