import React, { useState, useEffect } from "react";
import SearchFilter from "../../components/SearchFilter";
import DescriptionCard from "../../components/LostAndFound/DescriptionCard";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./LostItem.css";
import HeaderBar from "../../components/HeaderBar/HeaderBar";

const LostItem = (props) => {
  const token = localStorage.getItem("token");
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/losts");
      const sortedItems = response.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      setItems(sortedItems); //sort by date time
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/lost/${id}`, Authorization);
      loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term state
    const filtered = items.filter((item) => {
      // Ensure item.name and item.item_Description are not null or undefined
      const busDescription = item.bus_Description
        ? item.bus_Description.toLowerCase()
        : "";
      const itemDescription = item.item_Description
        ? item.item_Description.toLowerCase()
        : "";

      return (
        busDescription.includes(term.toLowerCase()) ||
        itemDescription.includes(term.toLowerCase())
      );
    });
    setFilteredItems(filtered);
  };

  return (
    <>
      <HeaderBar></HeaderBar>
      <div className="container">
        <h1 className="title">Reported Lost Items</h1>
        <SearchFilter onSearch={handleSearch} />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index}>
              <DescriptionCard
                id={item.id}
                Uname={item.name}
                numb={item.mobile_Number}
                bus={item.bus_Description}
                desc={item.item_Description}
                dateTime={item.dateTime}
                editLink={`/lostandfound/lostfoundreport2/${item.id}`}
                onDelete={deleteItem}
              />
            </div>
          ))
        ) : searchTerm.length > 0 ? (
          <p>No items found matching the search term.</p>
        ) : (
          items.map((item, index) => (
            <div key={index}>
              <DescriptionCard
                id={item.id}
                Uname={item.name}
                numb={item.mobile_Number}
                bus={item.bus_Description}
                desc={item.item_Description}
                dateTime={item.dateTime}
                editLink={`/lostandfound/lostfoundreport2/${item.id}`}
                onDelete={() => deleteItem(item.id)}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default LostItem;
