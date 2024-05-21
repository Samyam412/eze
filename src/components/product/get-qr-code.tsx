"use client";

import { Share1Icon } from "@radix-ui/react-icons";
import Image from "next/legacy/image";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const QrCode = () => {
  const pathname = usePathname();
  const fullUrl = `${window.location.protocol}//${window.location.host}${pathname}`;
  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${fullUrl}`;

  const copyToClipboard = () => {
    toast("URL Copied to clipboard");
    void navigator.clipboard.writeText(fullUrl);
  };

  return (
    <div className="flex items-center justify-center gap-8">
      {qrCode && <Image src={qrCode} alt="QR Code" width={100} height={100} />}
      <div
        className="flex cursor-pointer items-center justify-center gap-2 "
        onClick={copyToClipboard}
      >
        <p>Share</p>
        <Share1Icon />
      </div>
    </div>
  );
};

export default QrCode;
