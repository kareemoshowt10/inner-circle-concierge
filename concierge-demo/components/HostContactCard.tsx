interface HostContactCardProps {
  hostName: string;
  phone: string;
  email: string;
}

export default function HostContactCard({ hostName, phone, email }: HostContactCardProps) {
  return (
    <div className="flex w-full justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-[#E3B98A] bg-[#FBF0DF] px-4 py-3 text-[14px] text-[#5A4632] shadow-sm">
        <p className="mb-2 font-medium text-[#8A4B1F]">
          This one&apos;s best handled by {hostName} directly:
        </p>
        <div className="flex flex-col gap-1">
          <a href={`tel:${phone}`} className="underline underline-offset-2">
            {phone}
          </a>
          <a href={`mailto:${email}`} className="underline underline-offset-2">
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
