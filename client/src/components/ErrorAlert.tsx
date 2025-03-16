import { Alert } from "@heroui/alert";

export default function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="my-3 flex w-full items-center">
      <Alert color="danger" title={message} />
    </div>
  );
}
