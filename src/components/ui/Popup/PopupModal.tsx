import React, { useContext } from "react";
import { Grid, Box, Paper, Typography, Button, Divider } from "@mui/material";
import Image from "next/image";
import Boy from "../../../../public/images/ui/boy.svg";
import dataContext from "@/context/dataContext";

const PopupModal = () => {
  const {targetedArea,setShowPopup,targetedSeason,targetedYear} = useContext(dataContext)
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Left Section (Top + Bottom) */}
        <Grid item xs={8}>
          <Grid container spacing={3} sx={{ height: "100%" }}>
            {/* Top Left (1 1) */}
            <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "2rem",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "green", fontWeight: "bold" }}
                      >
                        Bhoomiscore
                      </Typography>
                      <Button variant="text" sx={{ color: "green" }}>
                        Know More
                      </Button>
                    </Box>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{ color: "green", borderColor: "green" }}
                    >
                      {targetedArea?.properties[`${targetedYear}_${targetedSeason}`]}
                    </Button>
                  </Paper>
             
             
            </Grid>

            {/* Bottom Left (2) */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                  BhoomiScore Analysis
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mb: 4 }}
                >
                  Excellent
                </Button>

                {/* Farm Image Section */}
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Your Farm Image
                </Typography>
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="https://1.bp.blogspot.com/-JtaQJC1jCQw/T-_RUuvOW7I/AAAAAAAAD6s/MhQjT_Sds-Y/s1600/2012-06-30_15-32-55_412.jpg"
                    alt="Farm Image"
                    width={500}
                    height={300}
                    style={{ borderRadius: "8px" }}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Section (User Details) */}
        <Grid item xs={4}>
        <Paper
        elevation={3}
        sx={{
          p: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Image
          src={Boy}
          alt="Avatar"
          width={100}
          height={100}
          style={{ borderRadius: "50%" }}
        />
        
        <Box sx={{ flexGrow: 1, width: '100%', mt: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {targetedArea?.properties.FARMER_NAME}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            47 Male
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="textSecondary">
            Village
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {targetedArea?.properties.VILLAGE}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="textSecondary">
            Farm Area [In Hec]
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {targetedArea?.properties.AREA_AS_PE}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="textSecondary">
            Crop Type
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {targetedArea?.properties.CROP_TYPE}
          </Typography>
        </Box>

        <Button variant="contained" color="success" sx={{ mt: 2, width: '80%' }} onClick={()=>setShowPopup(false)}>
          Go Back
        </Button>
      </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PopupModal;
