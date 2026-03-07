import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Components/Provider/AuthContext";


const RoleApplicationForm = ({ role, close }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const application = {
      userId: user.uid,
      name: user.displayName,
      email: user.email,
      requestedRole: role,
      motivation: form.motivation.value,
      skills: role === "freelancer" ? form.skills?.value : "",
      companyName: role === "buyer" ? form.company?.value : "",
      experience: form.experience.value,
      status: "pending",
      createdAt: new Date(),
    };

    const res = await fetch("https://halalkaj-server.vercel.app/role-applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    });

    if (res.ok) {
      Swal.fire("Success", "Application submitted!", "success");
      close();
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Apply as {role === "freelancer" ? "Freelancer" : "Buyer"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {role === "freelancer" && (
          <input
            name="skills"
            placeholder="Your Skills (React, Node, Design...)"
            className="input input-bordered w-full"
            required
          />
        )}

        {role === "buyer" && (
          <input
            name="company"
            placeholder="Company / Organization Name"
            className="input input-bordered w-full"
            required
          />
        )}

        <input
          name="experience"
          placeholder="Experience (e.g. 2 years)"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="motivation"
          placeholder="Why do you want this role?"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={close} className="btn btn-ghost">
            Cancel
          </button>
          <button disabled={loading} className="btn btn-primary">
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleApplicationForm;
