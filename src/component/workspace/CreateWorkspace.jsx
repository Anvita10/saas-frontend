import { useState } from "react";

const CreateWorkspace = () => {
  const role = ["ADMIN", "MEMBER"];
  const [wsName, setWsName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("MEMBER");
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);

  const handleWorkspaceSubmit = (e) => {
    e.preventDefault();
    if (!wsName) {
      setError("Workspace name is required");
      return;
    }
    console.log(wsName, members);
  };

  const handleAddMember = () => {
    const isUserAlreadyAdded = members.some((val) => val.email === email);
    if (isUserAlreadyAdded) {
      setError("User already added");
      return;
    }

    setMembers((prev) => [...prev, { email, role: userRole }]);
    setUserRole("MEMBER");
    setEmail("");
    setError("");
  };

  const removeUser = (user) => {
    setMembers((prev) => prev.filter((val) => val.email !== user));
  };

  return (
    <>
      <form onSubmit={handleWorkspaceSubmit}>
        {error && <h3>{error}</h3>}

        <input
          type="text"
          name="name"
          value={wsName}
          placeholder="Enter the Workspace name"
          onChange={(e) => {
            setError("");
            setWsName(e.target.value);
          }}
        />
        <h1>Add New Members</h1>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter the email address"
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />
        <select onChange={(e) => setUserRole(e.target.value)} value={userRole}>
          {role.map((val, idx) => (
            <option key={idx} value={val}>
              {val}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddMember} disabled={!email}>
          Add Member
        </button>
        <button type="submit">Create</button>
      </form>
      {members.length > 0 && (
        <ul>
          {members.map((val, idx) => {
            return (
              <li key={idx}>
                {" "}
                <h2>{val.email}</h2>
                <h4>{val.role}</h4>
                <button type="button" onClick={() => removeUser(val.email)}>
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default CreateWorkspace;
