import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageRole = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("https://halalkaj-server.vercel.app/role-applications")
      .then(res => res.json())
      .then(setApps);
  }, []);

  const handleDecision = async (id, userId, role, status) => {
    await fetch(`https://halalkaj-server.vercel.app/role-applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, userId, role }),
    });

    Swal.fire("Done!", `Application ${status}`, "success");
    setApps(prev => prev.filter(app => app._id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Role Applications</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(app => (
              <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.requestedRole}</td>
                <td>
                  <span className="badge badge-warning">{app.status}</span>
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleDecision(app._id, app.userId, app.requestedRole, "approved")}
                    className="btn btn-success btn-xs"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(app._id, app.userId, app.requestedRole, "rejected")}
                    className="btn btn-error btn-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRole;
