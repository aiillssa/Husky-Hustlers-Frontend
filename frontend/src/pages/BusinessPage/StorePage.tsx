import React, { useState, useEffect } from "react";
import { getShop } from "../../utils/api";
import { useParams } from "react-router-dom";
import classes from "./StorePage.module.css";

const DEBUG : boolean = true;

function StorePage() {
  const { shopId } = useParams<{ shopId: string }>(); /*Gets ShopID */
  const [contactInformation, setContactInformation] = useState<Map<string, string> | null>(null);
  const [shopName, setShopName] = useState<string>("");
  const [shopDescription, setShopDescription] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("Basics"); // State to track active tab
  const [bannerURL, setBannerURL] = useState<string>("No banner image");

  // Fetch shop data when shopId is available
  useEffect(() => {
    if (shopId) {
      const fetchData = async () => {
        try {
          const shop = await getShop(Number(shopId));
          const contactInfoMap = new Map();
          for (const [key, value] of Object.entries(shop.contactInformation)) {
            contactInfoMap.set(key, value);
          }
          setContactInformation(contactInfoMap);
          setShopName(shop.shopName);
          setShopDescription(shop.shopDescription);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };

      const fetchBanner = async () => {
        if(DEBUG) console.log("inside fetchBanner")
        
        //const id = 'testID';
        const id = Number(localStorage.getItem("userID"));
        //const id = 'userIDtest';
        const bannerURLtest = `http://localhost:8088/blob/${id}/banner`;
  
        if(DEBUG) console.log(bannerURLtest);
        if(DEBUG) console.log(id);
        setBannerURL(bannerURLtest);
  
        if(DEBUG) console.log("banner URL", bannerURL)
        
      };

      
      fetchData();
      fetchBanner();
    }
  }, [shopId]);

  return (
    <div className={classes.pageContainer}>

      {/* Header Section */}
      <div className={classes.header}>
        <div className={classes.profilePic}></div>
        <div className={classes.shopName}>{shopName}</div>
      </div>

      {/** BANNER */}
      <img src={bannerURL} style={{width: "100%", height:"200px", objectFit:"cover"}}/>

      {/* Tabs Section */}
      <div className={classes.tabs}>
        <div
          className={`${classes.tab} ${activeTab === "Basics" ? classes.activeTab : ""}`}
          onClick={() => setActiveTab("Basics")}
        >
          Basics
        </div>
        <div
          className={`${classes.tab} ${activeTab === "Other" ? classes.activeTab : ""}`}
          onClick={() => setActiveTab("Other")}
        >
          Other
        </div>
        <div
          className={`${classes.tab} ${activeTab === "Pictures" ? classes.activeTab : ""}`}
          onClick={() => setActiveTab("Pictures")}
        >
          Pictures
        </div>
      </div>

      {/* Divider Line */}
      <div className={classes.divider}></div>

      {/* Content Section */}
      <div className={classes.content}>
        {activeTab === "Basics" && (
          <>
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Description:</div>
              <div className={classes.sectionContent}>{shopDescription || "No description available."}</div>
            </div>
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Contact Info:</div>
              <div className={classes.sectionContent}>
                {contactInformation}
              </div>
            </div>
          </>
        )}
        {activeTab === "Pictures" && (
          <div className={classes.picturesSection}>
            <div className={classes.pictureRow}>
              <div className={classes.pictureCard}>
                <div className={classes.imagePlaceholder}></div>
                <div className={classes.caption}>Caption</div>
                <div className={classes.pricing}>Pricing</div>
              </div>
              <div className={classes.pictureCard}>
                <div className={classes.imagePlaceholder}></div>
                <div className={classes.caption}>Caption</div>
                <div className={classes.pricing}>Pricing</div>
              </div>
              <div className={classes.pictureCard}>
                <div className={classes.imagePlaceholder}></div>
                <div className={classes.caption}>Caption</div>
                <div className={classes.pricing}>Pricing</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StorePage;
