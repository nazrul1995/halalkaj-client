import React, { use, useState } from "react";
import { AuthContext } from "../../Components/Provider/AuthContext";
import Swal from "sweetalert2";

const AddJob = () => {
    const { user } = use(AuthContext)
    const handleAddJob = (e) => {
         e.preventDefault();
        const formData = {
            title: e.target.title.value,
            postedBy: user.displayName || user.email.split('@')[0],
            category: e.target.category.value,
            summary: e.target.summary.value,
            coverImage: e.target.coverImage.value,
            userEmail: user.email,
            postedAt: new Date(),
            ...preview,
        };
        fetch('https://halalkaj-server.vercel.app/add-job/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // SweetAlert Success Message
                Swal.fire({
                    title: "Job Added Successfully!",
                    text: `${preview.title || "Your job"} has been added.`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
            })
            .catch(err => {
                console.log(err)
            })

    }

    // ✅ State for live preview
    const [preview, setPreview] = useState({
        title: "",
        category: "",
        summary: "",
        coverImage: "",
        price: "",
        deadline: "",
        postedBy: user?.displayName || "Anonymous",
    });

    // ✅ Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPreview((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="w-11/12 mx-auto py-10">
            {/* Page Title */}
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Add a New Job
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* ------- Left Side: Form ------- */}
                <div className="bg-white shadow-lg rounded-xl p-6 lg:col-span-2">
                    <form
                        onSubmit={handleAddJob}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    > 
                        {/* Job Title */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2 font-medium">
                                Job Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange}
                                placeholder="e.g. SEO Optimization for Blog Site"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Category
                            </label>
                            <select
                                name="category"
                                onChange={handleChange}
                                defaultValue=""
                                className="select select-bordered w-full"
                            >
                                <option disabled value="">
                                    Select a category
                                </option>
                                <option value="Design">Design</option>
                                <option value="Development">Development</option>
                                <option value="Graphics Design">Graphics Design</option>
                                <option value="SEO">SEO</option>
                                <option value="Content Writing">Content Writing</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Video Editing">Video Editing</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>


                        {/* Cover Image */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Cover Image URL
                            </label>
                            <input
                                type="text"
                                name="coverImage"
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Summary */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2 font-medium">
                                Short Summary
                            </label>
                            <textarea
                                name="summary"
                                rows="3"
                                onChange={handleChange}
                                placeholder="Write a short summary of the job..."
                                className="textarea textarea-bordered w-full"
                            ></textarea>
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Budget (USD)
                            </label>
                            <input
                                type="number"
                                name="price"
                                onChange={handleChange}
                                placeholder="Enter Budget"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Deadline
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-full hover:scale-105 transition-transform duration-300"
                            >
                                Add Job
                            </button>
                        </div>
                    </form>
                </div>

                {/* ------- Right Side: Live Preview ------- */}
                <div className="bg-gray-50 shadow-md rounded-xl p-5 flex flex-col items-center justify-start">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Job Preview
                    </h3>

                    <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden w-full">
                        <img
                            src={
                                preview.coverImage ||
                                "https://www.wearemarketing.com/uploads/media/default/0001/21/06ec61f54cd06fa924c13bc4492fb1c9e97480f8.jpeg"
                            }
                            alt={preview.title || "Job Preview"}
                            className="h-40 w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-gray-800 mb-1">
                                {preview.title || "Job Title Here"}
                            </h2>
                            <p className="text-sm text-blue-500 mb-2">
                                {preview.category || "Category"}
                            </p>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {preview.summary ||
                                    "Short summary of the job will appear here as you type."}
                            </p>

                            <div className="flex justify-between text-sm text-gray-700">
                                <span>💰 {preview.price ? `$${preview.price}` : "$0"}</span>
                                <span>
                                    📅{" "}
                                    {preview.deadline
                                        ? preview.deadline
                                        : "No Deadline"}
                                </span>
                                <span>👤 {preview.postedBy}</span>
                            </div>

                            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddJob;
