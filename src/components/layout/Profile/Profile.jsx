import React from "react";
import { Briefcase, Building, MapPin, Mail, Users, CheckSquare, Link } from "lucide-react";
import { Button } from "../Button/Button";

export default function Profile() {
  const user = {
    name: "Đặng Anh Quân",
    email: "22211tt1369@mail.tdc.edu.vn",
    jobTitle: "Software Engineer",
    department: "Engineering",
    organization: "AMU Corp",
    location: "Hanoi, Vietnam",
    avatar: "/avatar.jpg",
    workedOn: [
      { title: "Implement NLP Engine", date: "April 22, 2025" },
      { title: "Create User Flow Diagram", date: "April 22, 2025" },
      { title: "Design Chatbot Personality", date: "April 22, 2025" },
      { title: "Develop Frontend Interface", date: "April 22, 2025" },
      { title: "Chatbot Development", date: "April 22, 2025", highlight: true }
    ],
    projects: [
      { name: "Chatbot for Customer Support", url: "#" }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 font-sans">
      {/* Header */}
      <div className="flex items-center gap-6 border-b-4 border-black pb-4">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-none border-4 border-black object-cover"
        />
        <div>
          <h1 className="text-3xl font-extrabold uppercase">{user.name}</h1>
          <Button variant="outline" className="mt-2 border-black text-black hover:bg-black hover:text-white">
            Manage your account
          </Button>
        </div>
      </div>

      {/* About Section */}
      <div className="border-4 border-black p-4 space-y-4">
        <h2 className="text-2xl font-bold uppercase">About</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-3">
            <Briefcase className="w-5 h-5" />
            <span>{user.jobTitle}</span>
          </li>
          <li className="flex items-center gap-3">
            <Users className="w-5 h-5" />
            <span>{user.department}</span>
          </li>
          <li className="flex items-center gap-3">
            <Building className="w-5 h-5" />
            <span>{user.organization}</span>
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            <span>{user.location}</span>
          </li>
        </ul>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="flex items-center gap-3 mt-1">
            <Mail className="w-5 h-5" />
            <a href={`mailto:${user.email}`} className="underline">
              {user.email}
            </a>
          </div>
        </div>
      </div>

      {/* Worked On Section */}
      <div className="border-4 border-black p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold uppercase">Worked On</h2>
          <a href="#" className="text-blue-600 underline">
            View all
          </a>
        </div>
        <ul className="space-y-2">
          {user.workedOn.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckSquare className={`w-5 h-5 mt-1 ${item.highlight ? "text-purple-600" : "text-black"}`} />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-gray-600">You created this on {item.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Places You Work In Section */}
      <div className="border-4 border-black p-4 space-y-4">
        <h2 className="text-2xl font-bold uppercase">Places you work in</h2>
        <div className="bg-gray-100 p-3 border-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link className="w-6 h-6" />
            <span className="font-semibold text-blue-600">{user.projects[0].name}</span>
          </div>
          <a href={user.projects[0].url} className="underline">
            Go
          </a>
        </div>
      </div>

      {/* Feedback */}
      <div className="text-center">
        <p className="text-gray-600 mb-2">
          Tell us about your experience with profiles and search within this directory.
        </p>
        <Button className="border-black text-black hover:bg-black hover:text-white">
          Send Feedback
        </Button>
      </div>
    </div>
  );
}
