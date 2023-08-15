import React, { useState } from "react";
import Loading from "../../Loading";
import instance from "../../axios/axios";
import cookies from "js-cookies"
import { useNavigate } from "react-router-dom";

const BlackWhiteThemeForm = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [links, setLinks] = useState([]);
  const [linkUrl, setLinkUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [file, setFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
const navigate=useNavigate()
  const types = [
    "Web development",
    "Ui/Ux design",
    "Civil Engineeer",
    "Graphic Designer",
    "App Development",
    "Game development",
    "Cyber Security",
    "DevOps",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log("Heading:", heading);
    console.log("Description:", description);
    console.log("Price:", price);
    console.log("Links:", links);
    console.log("File:", file);
    console.log("Selected Option:", selectedOption);
    instance.post('/createPosts',{
        token:cookies.getItem('token'),
        data:{
            head:heading,
            description,
            links,
            pic:file,
            type:selectedOption,
            price
        }
    }).then(res=>{
        setHeading("");
        setDescription("");
        setPrice("");
        setLinks([]);
        setFile(null);
        setSelectedOption("");
        navigate('/myPosts',{replace:true})
    })
  
  };

  const handleAddLink = () => {
    if (linkUrl.trim() !== "" && linkName.trim() !== "") {
      setLinks([...links, { url: linkUrl, name: linkName }]);
      setLinkUrl("");
      setLinkName("");
    }
  };

  const handleFileUpload = (e) => {
    setLoading(true)
    const selectedFile = e.target.files[0];
    let formData = new FormData()
    formData.append('file',selectedFile)
    instance.post('/imageUpload',formData).then(res=>{
        setLoading(false)
        setFile(res.data.url)
    })
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div
      style={{
        background: "#0000",
        color: " black",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
      }}
      className="height-100vh-min"
    >
      {loading ? <Loading /> : null}

      <h1 style={{ textAlign: "center" }}>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="heading" style={{ display: "block" }}>
            Heading:
          </label>
          <input
            type="text"
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
            style={{
              background: "transparent",
              color: " black",
              border: "none",
              borderBottom: "1px solid  black",
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="description" style={{ display: "block" }}>
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              background: "transparent",
              color: " black",
              border: "none",
              borderBottom: "1px solid  black",
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              resize: "vertical",
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="price" style={{ display: "block" }}>
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min={0}
            style={{
              background: "transparent",
              color: " black",
              border: "none",
              borderBottom: "1px solid  black",
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="links" style={{ display: "block" }}>
            Links:
          </label>
          {links.map((link, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              <input
                type="text"
                value={link.url}
                onChange={(e) => {
                  const updatedLinks = [...links];
                  updatedLinks[index].url = e.target.value;
                  setLinks(updatedLinks);
                }}
                style={{
                  background: "transparent",
                  color: " black",
                  border: "none",
                  borderBottom: "1px solid  black",
                  width: "50%",
                  marginRight: "8px",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              />
              <input
                type="text"
                value={link.name}
                onChange={(e) => {
                  const updatedLinks = [...links];
                  updatedLinks[index].name = e.target.value;
                  setLinks(updatedLinks);
                }}
                style={{
                  background: "transparent",
                  color: " black",
                  border: "none",
                  borderBottom: "1px solid  black",
                  width: "30%",
                  marginRight: "8px",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const updatedLinks = [...links];
                  updatedLinks.splice(index, 1);
                  setLinks(updatedLinks);
                }}
                style={{
                  background: "transparent",
                  color: " black",
                  border: "1px solid  black",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={{ marginBottom: "8px" }}>
            <input
              type="text"
              placeholder="Link URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              style={{
                background: "transparent",
                color: " black",
                border: "none",
                borderBottom: "1px solid  black",
                width: "50%",
                marginRight: "8px",
                padding: "8px",
                borderRadius: "4px",
              }}
            />
            <input
              type="text"
              placeholder="Link Name"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              style={{
                background: "transparent",
                color: " black",
                border: "none",
                borderBottom: "1px solid  black",
                width: "30%",
                marginRight: "8px",
                padding: "8px",
                borderRadius: "4px",
              }}
            />
            <button
              type="button"
              onClick={handleAddLink}
              style={{
                background: "transparent",
                color: " black",
                border: "1px solid  black",
                borderRadius: "4px",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Add Link
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="file" style={{ display: "block" }}>
            File Upload:
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileUpload}
            required
            style={{
              background: "transparent",
              color: " black",
              border: "none",
              borderBottom: "1px solid  black",
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="option" style={{ display: "block" }}>
            Select Option:
          </label>
          <select
            id="option"
            value={selectedOption}
            onChange={handleSelectChange}
            style={{
              background: "transparent",
              color: " black",
              border: "none",
              borderBottom: "1px solid  black",
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            <option value="" className="text-black">
              Select an option
            </option>
            {types.map((x) => (
              <option value={x} className="text-black">
                {x}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            background: "white",
            color: "black",
            border: "1px solid",
            borderRadius: "4px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlackWhiteThemeForm;
