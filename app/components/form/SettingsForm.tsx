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

import { useFormState } from "react-dom";

import { useEffect } from "react";
import { toast } from "sonner";
import { type State, UpdateUserSettings } from "@/app/actions";
import SubmitButton from "../SubmitButtons";

interface iAppProps {
  firstName: string;
  lastName: string;
  email: string;
}

const SettingsForm = ({ firstName, lastName, email }: iAppProps) => {
  const intialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(UpdateUserSettings, intialState);

  useEffect(() => {
    if (state?.status === "error") {
      toast.error(state.message);
    } else if (state?.status === "success") {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Settings regarding your account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label>First Name</Label>
          <Input name="firstName" type="text" defaultValue={firstName} />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Last Name</Label>
          <Input name="lastName" type="text" defaultValue={lastName} />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Email</Label>
          <Input name="email" type="email" disabled defaultValue={email} />
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton title="Update your settings" />
      </CardFooter>
    </form>
  );
};

export default SettingsForm;
