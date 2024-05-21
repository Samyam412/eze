// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import { Textarea } from "~/components/ui/textarea";
import { FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
        <p className="mb-6 text-gray-600">
          Have questions or need support? Reach out to us!
        </p>

        <div className="mb-4 flex items-center">
          <span className="mr-2 text-gray-700">
            <FaEnvelope />
          </span>
          <span>Email: info@toysnpark.com</span>
        </div>
        <div className="mb-6 flex items-center">
          <span className="mr-2 text-gray-700">
            <i className="fas fa-phone"></i>
          </span>
          <span>Phone: +xxx xxxxxxxxxx</span>
        </div>

        <h2 className="mb-4 text-xl font-bold">Send Us a Message</h2>
        {/* <form className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Textarea
            placeholder="Your Message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <p className="text-sm text-muted-foreground">
            Your message will be copied to the support team.
          </p>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send
          </Button>
        </form> */}
      </div>
    </div>
  );
};

export default ContactPage;
