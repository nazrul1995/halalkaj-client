// src/pages/AcceptedTask.jsx
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Components/Provider/AuthContext";

const AcceptedTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch accepted tasks
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.accessToken) return;

      try {
        const res = await fetch(
          `https://halalkaj-server.vercel.app/my-accepted-tasks?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to load tasks");

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  console.log(tasks);

  // Mark as Done (Complete)
  const handleDone = async (taskId) => {
    Swal.fire({
      title: "Mark as Done?",
      text: "This will complete the task and remove it from your list.",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#facc15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Done!",
      cancelButtonText: "No, Keep It",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://halalkaj-server.vercel.app/task-action/${taskId}`, {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          });

          if (res.ok) {
            setTasks(tasks.filter((t) => t._id !== taskId));
            Swal.fire("Done!", "Task completed successfully.", "success");
          }
        } catch (err) {
          Swal.fire("Error", "Failed to complete task.", "error");
          console.log(err)
        }
      }
    });
  };

  // Cancel Task
  const handleCancel = async (taskId) => {
    Swal.fire({
      title: "Cancel Task?",
      text: "Are you sure you want to cancel this task? This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel It!",
      cancelButtonText: "No, Keep It",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://halalkaj-server.vercel.app/task-action/${taskId}`, {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          });

          if (res.ok) {
            setTasks(tasks.filter((t) => t._id !== taskId));
            Swal.fire("Cancelled!", "Task has been removed.", "info");
          }
        } catch (err) {
          console.log(err)
          Swal.fire("Error", "Failed to cancel task.", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            My <span className="text-warning">Accepted Tasks</span>
          </h1>
          <p className="mt-2 text-gray-600">Complete or cancel your ongoing projects</p>
        </div>

        {/* Empty State */}
        {tasks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg">
            <i className="fas fa-tasks text-6xl text-gray-300 mb-4"></i>
            <p className="text-xl text-gray-500 mb-6">No accepted tasks yet.</p>
            <a href="/jobs" className="btn btn-warning rounded-full px-8">
              Browse Jobs
            </a>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-hidden rounded-xl shadow-lg bg-white">
              <table className="table table-zebra w-full">
                <thead className="bg-green-900 text-white">
                  <tr>
                    <th className="py-4 w-xs">Task</th>
                    <th>Category</th>
                    <th>Client</th>
                    <th>Accepted On</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id} className="hover:bg-gray-50 transition-all">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={task.coverImage || "https://via.placeholder.com/60"}
                            alt={task.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-800 line-clamp-1">{task.title}</p>
                            <p className="text-xs text-gray-500">ID: {task._id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-sm badge-primary">{task.category}</span>
                      </td>
                      <td>
                        <span className="text-sm font-medium">
                          {task.postedBy?.split("@")[0] || "Unknown"}
                        </span>
                      </td>
                      <td>
                        <span className="text-sm">
                          {new Date(task.accepted_date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-warning badge-sm">In Progress</span>
                      </td>
                      <td className="text-center">
                        <div className="flex gap-2 justify-center">
                          {/* Done Button */}
                          <button
                            onClick={() => handleDone(task._id)}
                            className="btn btn-warning btn-xs rounded-full text-white hover:bg-yellow-600 transition-all"
                            title="Mark as Done"
                          >
                            Done
                          </button>
                          {/* Cancel Button */}
                          <button
                            onClick={() => handleCancel(task._id)}
                            className="btn btn-xs rounded-full text-gray hover:text-white hover:bg-green-600 transition-all"
                            title="Cancel Task"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex gap-3 mb-3">
                    <img
                      src={task.coverImage || "https://via.placeholder.com/80"}
                      alt={task.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 line-clamp-1">{task.title}</h3>
                      <p className="text-xs text-gray-500">ID: {task._id.slice(-6)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Category</p>
                      <p className="font-medium">{task.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Client</p>
                      <p className="font-medium">
                        {task.clientEmail?.split("@")[0] || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Accepted</p>
                      <p className="font-medium">
                        {new Date(task.accepted_at).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <span className="badge badge-warning badge-xs">In Progress</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDone(task._id)}
                      className="flex-1 btn btn-warning btn-sm rounded-full text-white"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => handleCancel(task._id)}
                      className="flex-1 btn btn-error btn-sm rounded-full text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptedTask;
