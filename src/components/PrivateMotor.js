import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalculateIcon from '@mui/icons-material/Calculate';

export function PrivateMotor() {
  const navigate = useNavigate();
  
  // Basic Details
  const [proposerName, setProposerName] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [productType, setProductType] = useState('');
  const [geoExtension, setGeoExtension] = useState(false);
  
  // Dates & Zone
  const [purchaseDate, setPurchaseDate] = useState('');
  const [policyStartDate, setPolicyStartDate] = useState('');
  const [zone, setZone] = useState('zonea');
  const [vehicleAge, setVehicleAge] = useState('— months');
  
  // Vehicle Details
  const [engineType, setEngineType] = useState('PETROL');
  const [engineCC, setEngineCC] = useState('');
  const [biFuel, setBiFuel] = useState(false);
  const [drivingSchool, setDrivingSchool] = useState(false);
  
  // Sum Insured
  const [oldIDV, setOldIDV] = useState('');
  const [depreciation, setDepreciation] = useState('');
  const [newIDV, setNewIDV] = useState(0);
  const [electricalSI, setElectricalSI] = useState('');
  const [cngSI, setCngSI] = useState('');
  
  // Premium Summary
  const [odPremium, setOdPremium] = useState(0);
  const [tpPremium, setTpPremium] = useState(0);
  const [addOnPremium, setAddOnPremium] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalPremium, setTotalPremium] = useState(0);
  
  // DISCOUNTS & NCB
  const [ncb, setNcb] = useState('');
  const [discount, setDiscount] = useState('');
  const [nd, setNd] = useState(false);
  const [ndType, setNdType] = useState('');
  const [ndDisc, setNdDisc] = useState(0);
  const [rti, setRti] = useState(false);
  const [rtiType, setRtiType] = useState('');
  const [rtiDisc, setRtiDisc] = useState(0);
  const [ep, setEp] = useState(false);
  const [epType, setEpType] = useState('');
  const [epDisc, setEpDisc] = useState(0);
  const [cm, setCm] = useState(false);
  const [cmType, setCmType] = useState('');
  const [cmDisc, setCmDisc] = useState(0);
  const [hp, setHp] = useState(false);
  const [hpType, setHpType] = useState('');
  const [hpDisc, setHpDisc] = useState(0);
  
  // ADD-ON ENHANCEMENT COVERAGES
  const [bp, setBp] = useState(false);
  const [bpType, setBpType] = useState('');
  const [bp2ClaimRemove, setBp2ClaimRemove] = useState(false);
  const [bc, setBc] = useState(false);
  const [epAddon, setEpAddon] = useState(false);
  const [epAddonType, setEpAddonType] = useState('');
  const [ndAddon, setNdAddon] = useState(false);
  const [ndAddonType, setNdAddonType] = useState('');
  const [rtiAddon, setRtiAddon] = useState(false);
  const [rtiAddonType, setRtiAddonType] = useState('');
  const [cmAddon, setCmAddon] = useState(false);
  const [cmAddonType, setCmAddonType] = useState('');
  const [hpAddon, setHpAddon] = useState(false);
  const [hpAddonType, setHpAddonType] = useState('');
  const [tow, setTow] = useState(false);
  const [loc, setLoc] = useState(false);
  const [pb, setPb] = useState(false);
  const [kp, setKp] = useState(false);
  const [ta, setTa] = useState(false);
  const [ncbp, setNcbp] = useState(false);
  const [hvpa, setHvpa] = useState(false);
  const [hvpaCount, setHvpaCount] = useState(0);
  const [rsaCheck, setRsaCheck] = useState(false);
  const [rsa, setRsa] = useState('');
  
  // ADDITIONAL LIABILITY COVERS
  const [pa, setPa] = useState(false);
  const [paDuration, setPaDuration] = useState('');
  const [llpd, setLlpd] = useState(false);
  const [tppdLimit, setTppdLimit] = useState(false);
  const [unpa, setUnpa] = useState(false);
  const [unpaCount, setUnpaCount] = useState(0);
  const [unpaSI, setUnpaSI] = useState(0);
  const [paPd, setPaPd] = useState(false);
  const [paPdSI, setPaPdSI] = useState('');
  
  // AGENT / OFFICE DETAILS
  const [agentName, setAgentName] = useState('');
  const [agentMobile, setAgentMobile] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [officeCode, setOfficeCode] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [officerName, setOfficerName] = useState('');
  
  // Calculate New IDV
  useEffect(() => {
    if (oldIDV && depreciation) {
      const calculated = Number(oldIDV) - (Number(oldIDV) * Number(depreciation) / 100);
      setNewIDV(Math.round(calculated));
    } else if (oldIDV) {
      setNewIDV(Number(oldIDV));
    } else {
      setNewIDV(0);
    }
  }, [oldIDV, depreciation]);
  
  // Calculate Vehicle Age
  useEffect(() => {
    if (purchaseDate && policyStartDate) {
      const purchase = new Date(purchaseDate);
      const start = new Date(policyStartDate);
      const diffTime = Math.abs(start.getTime() - purchase.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      setVehicleAge(`${diffMonths} months`);
    } else {
      setVehicleAge('— months');
    }
  }, [purchaseDate, policyStartDate]);
  
  const handleCalculate = () => {
    const GST_RATE = 0.18;
    const prod = productType;
    if (!prod) {
      alert("Select Product");
      return;
    }

    if (!purchaseDate && prod !== "LIAB") {
      alert("Purchase Date is required.");
      return;
    }

    const cfg = {
      BEL: { od: true, tp: 3, addons: true },
      BPL: { od: true, tp: 3, addons: false },
      ENH: { od: true, tp: 1, addons: true },
      PACK: { od: true, tp: 1, addons: false },
      LIAB: { od: false, tp: 1, addons: false },
      SOD_A: { od: true, tp: 0, addons: true },
      SOD_NA: { od: true, tp: 0, addons: false }
    }[prod];

    const allowAddons = (prod === "BEL" || prod === "ENH" || prod === "SOD_A");
    const isBundled = (prod === "BEL" || prod === "BPL");
    const isStandaloneOD = (prod === "SOD_A" || prod === "SOD_NA");

    const nidv = newIDV;
    const cc = Number(engineCC);
    if (cfg.od && (!nidv || !cc)) {
      alert("Enter CC & IDV");
      return;
    }

    // Calculate vehicle age in years
    const pDate = new Date(purchaseDate);
    const rDate = new Date(policyStartDate);
    let odYears = 0;
    if (pDate && rDate) {
      odYears = rDate.getFullYear() - pDate.getFullYear();
      if (rDate.getMonth() < pDate.getMonth() || 
          (rDate.getMonth() === pDate.getMonth() && rDate.getDate() < pDate.getDate())) {
        odYears--;
      }
    }

    // OD Rate calculation
    const odRateValue = (() => {
      const slabCC = engineType === "ELECTRIC" ? 
        (cc <= 30 ? 1000 : cc <= 65 ? 1500 : 2000) : cc;
      
      if (zone === "zonea") {
        if (odYears < 5) return slabCC <= 1000 ? 3.127 : slabCC <= 1500 ? 3.283 : 3.440;
        if (odYears < 10) return slabCC <= 1000 ? 3.283 : slabCC <= 1500 ? 3.447 : 3.612;
        return slabCC <= 1000 ? 3.362 : slabCC <= 1500 ? 3.529 : 3.698;
      } else {
        if (odYears < 5) return slabCC <= 1000 ? 3.039 : slabCC <= 1500 ? 3.191 : 3.343;
        if (odYears < 10) return slabCC <= 1000 ? 3.191 : slabCC <= 1500 ? 3.351 : 3.510;
        return slabCC <= 1000 ? 3.267 : slabCC <= 1500 ? 3.430 : 3.594;
      }
    })();

    let grossBaseOD = nidv * odRateValue / 100;
    const odDiscPct = Number(discount) || 0;
    let basicOD = grossBaseOD - (grossBaseOD * odDiscPct / 100);

    // Electrical fittings
    let elecAfterDisc = 0;
    if (Number(electricalSI) > 0) {
      elecAfterDisc = Number(electricalSI) * 0.04;
      elecAfterDisc -= elecAfterDisc * odDiscPct / 100;
    }

    // Bi-fuel OD
    let bifuelOD = 0;
    if (biFuel) {
      bifuelOD = (basicOD + elecAfterDisc) * 0.05;
    }

    // External CNG
    let extCngOD = 0;
    if (Number(cngSI) >= 10000) {
      extCngOD = Number(cngSI) * 0.04;
      extCngOD -= extCngOD * odDiscPct / 100;
    }

    // NCB
    const ncbPct = Number(ncb) || 0;
    let ncbBase = basicOD + elecAfterDisc + bifuelOD + extCngOD;
    const ncbAmt = ncbBase * ncbPct / 100;

    // Add-on calculations
    let addonPremium = 0;

    // Nil Dep
    if (allowAddons && nd && ndType) {
      const ndRate = (() => {
        const completedYears = odYears;
        if (completedYears > 4) return 0;
        const slab = cc <= 1000 ? "A" : cc <= 1500 ? "B" : "C";
        const rates = {
          "1YEAR": { A: [0.38, 0.48, 0.62, 0.81, 1], B: [0.38, 0.48, 0.62, 0.81, 1], C: [0.43, 0.52, 0.67, 0.86, 1.05] },
          "3YEAR": { A: [0.58, 0.72, 0.94, 1.22, 1.51], B: [0.58, 0.72, 0.94, 1.22, 1.51], C: [0.65, 0.79, 1, 1.29, 1.58] },
          "5YEAR": { A: [0.86, 1.08, 1.4, 1.84, 2.27], B: [0.86, 1.08, 1.4, 1.84, 2.27], C: [0.97, 1.19, 1.51, 1.94, 2.37] }
        };
        return rates[ndType]?.[slab]?.[completedYears] || 0;
      })();
      let ndPremium = nidv * ndRate / 100;
      if (ndDisc > 0) ndPremium -= ndPremium * ndDisc / 100;
      addonPremium += ndPremium;
    }

    // Engine Protect
    if (epAddon && engineType !== "ELECTRIC") {
      const epRate = (() => {
        const completedYears = odYears;
        if (completedYears <= 0) return 0.26;
        if (completedYears <= 1) return 0.28;
        if (completedYears <= 2) return 0.30;
        if (completedYears <= 3) return 0.35;
        if (completedYears <= 4) return 0.40;
        return 0;
      })();
      let epPremium = nidv * epRate / 100;
      if (epDisc > 0) epPremium -= epPremium * epDisc / 100;
      addonPremium += epPremium;
    }

    // RTI
    if (allowAddons && rtiAddon && rtiAddonType) {
      const rtiRate = (() => {
        const completedYears = odYears;
        if (completedYears > 1) return 0;
        if (rtiAddonType === "BASIC") return completedYears === 0 ? 0.21 : 0.44;
        if (rtiAddonType === "COMP") return completedYears === 0 ? 0.24 : 0.57;
        return 0;
      })();
      let rtiPremium = nidv * rtiRate / 100;
      if (rtiDisc > 0) rtiPremium -= rtiPremium * rtiDisc / 100;
      addonPremium += rtiPremium;
    }

    // Consumables
    if (cmAddon) {
      const cmRate = (() => {
        const completedYears = odYears;
        if (completedYears <= 0) return 0.14;
        if (completedYears <= 1) return 0.16;
        if (completedYears <= 2) return 0.18;
        if (completedYears <= 3) return 0.21;
        if (completedYears <= 4) return 0.25;
        return 0;
      })();
      let cmPremium = nidv * cmRate / 100;
      if (cmDisc > 0) cmPremium -= cmPremium * cmDisc / 100;
      addonPremium += cmPremium;
    }

    // Tyre & Alloy
    if (ta) {
      const taRate = (() => {
        const completedYears = odYears;
        if (completedYears === 0) return 0.20;
        if (completedYears === 1) return 0.25;
        if (completedYears === 2) return 0.30;
        return 0;
      })();
      addonPremium += nidv * taRate / 100;
    }

    // NCB Protect
    if (ncbp) {
      const ncbpRate = {
        0: 8.5, 20: 10.63, 25: 14.88, 35: 19.13, 45: 21.25, 50: 21.25
      }[Number(ncb)] || 0;
      addonPremium += ncbBase * ncbpRate / 100;
    }

    // High Value PA
    if (hvpa) {
      addonPremium += hvpaCount * 1050;
    }

    // Battery Protect (EV only)
    if (bp && engineType === "ELECTRIC") {
      const bpRate = (() => {
        const completedYears = odYears;
        if (completedYears > 3) return 0;
        return bp2ClaimRemove ? 
          [0.33, 0.49, 0.67, 0.95][completedYears] : 
          [0.30, 0.44, 0.61, 0.87][completedYears];
      })();
      addonPremium += nidv * bpRate / 100;
    }

    // Hybrid Protect
    if (hpAddon && hpAddonType && engineType !== "ELECTRIC") {
      const hpRate = (() => {
        const completedYears = odYears;
        if (completedYears > 3) return 0;
        const rates = hpAddonType === "BASIC" ? 
          [0.20, 0.25, 0.30, 0.35] : 
          [0.43, 0.50, 0.57, 0.67];
        return rates[completedYears] || 0;
      })();
      let hpPremium = nidv * hpRate / 100;
      if (hpDisc > 0) hpPremium -= hpPremium * hpDisc / 100;
      addonPremium += hpPremium;
    }

    // Additional covers
    if (tow) addonPremium += 500;
    if (loc) addonPremium += 140;
    if (pb) addonPremium += 500;
    if (kp) addonPremium += 250;
    if (rsaCheck) addonPremium += Number(rsa);

    // Geographical Extension
    const geoExt = geoExtension ? (prod === "LIAB" ? 100 : 500) : 0;

    // Final OD Premium
    let odPremiumBeforeGST = basicOD + elecAfterDisc + bifuelOD + extCngOD + addonPremium + geoExt - ncbAmt;

    // TP Premium
    let tpPremiumValue = 0;
    if (cfg.tp > 0) {
      if (engineType === "ELECTRIC") {
        if (cfg.tp === 3) {
          tpPremiumValue = cc <= 30 ? 5543 : cc <= 65 ? 9044 : 20907;
        } else {
          tpPremiumValue = cc <= 30 ? 1780 : cc <= 65 ? 2904 : 6712;
        }
      } else {
        if (cfg.tp === 3) {
          tpPremiumValue = cc <= 1000 ? 6521 : cc <= 1500 ? 10640 : 24596;
        } else {
          tpPremiumValue = cc <= 1000 ? 2094 : cc <= 1500 ? 3416 : 7897;
        }
      }
    }

    // Additional TP covers
    let tpAddonPremium = 0;
    if (pa) {
      tpAddonPremium += (prod === "BEL" || prod === "BPL") && paDuration === "FULL" ? 800 : 275;
    }
    if (llpd) {
      tpAddonPremium += isBundled ? 150 : 50;
    }
    if (unpa) {
      const unpaRate = Number(unpaSI) * 0.0005 * Number(unpaCount);
      tpAddonPremium += isBundled ? unpaRate * 3 : unpaRate;
    }
    if (paPd) {
      let si = Number(paPdSI);
      if (si > 200000) si = 200000;
      tpAddonPremium += si * 0.0005 * (isBundled ? 3 : 1);
    }
    if (tppdLimit) {
      tpAddonPremium -= isBundled ? 300 : 100;
    }
    if (biFuel && !isStandaloneOD) {
      tpAddonPremium += isBundled ? 180 : 60;
    }
    if (Number(cngSI) >= 10000 && !isStandaloneOD) {
      tpAddonPremium += isBundled ? 180 : 60;
    }

    const tpPremiumBeforeGST = tpPremiumValue + tpAddonPremium;

    // Final calculations
    const subtotal = odPremiumBeforeGST + tpPremiumBeforeGST;
    const gstAmount = subtotal * GST_RATE;
    const total = subtotal + gstAmount;

    setOdPremium(Math.round(odPremiumBeforeGST));
    setTpPremium(Math.round(tpPremiumBeforeGST));
    setAddOnPremium(Math.round(addonPremium));
    setGst(Math.round(gstAmount));
    setTotalPremium(Math.round(total));
  };

  return (
    <Box sx={{ py: 4, bgcolor: '#eef1f9', minHeight: 'calc(100vh - 64px)' }}>
      <Box
        sx={{
          bgcolor: '#eef1f9',
          py: 2,
          mb: 3,
          boxShadow: '0 2px 20px rgba(0,0,0,0.2)',
          border: '5px solid #c062c4',
          borderRadius: '10px',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            align="center"
            sx={{ color: '#c062c4', fontWeight: 600, letterSpacing: '0.5px' }}
          >
            MOTOR PREMIUM CALCULATOR – PRIVATE CAR
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* LEFT COLUMN - FORM INPUTS */}
          <Grid item xs={12} md={6} sx={{width:'100%'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* BASIC DETAILS */}
              <Paper sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                <Box
                  sx={{
                    background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                    color: 'black',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    border: '3px solid #c062c4',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                >
                  <DirectionsCarIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
                    BASIC DETAILS
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Proposer Name (Optional)"
                        value={proposerName}
                        onChange={(e) => setProposerName(e.target.value)}
                        placeholder="e.g. Rajesh Kumar"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Registration No (Optional)"
                        value={registrationNo}
                        onChange={(e) => setRegistrationNo(e.target.value)}
                        placeholder="e.g. TN01AB1234"
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ width: '300px' }}>
                      <TextField
                        fullWidth
                        select
                        size="small"
                        label="Product Type"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                      >
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="BEL">Bundled Enhancement (1OD+3TP)</MenuItem>
                        <MenuItem value="BPL">Bundled Package (1OD+3TP)</MenuItem>
                        <MenuItem value="ENH">Enhancement (1OD+1TP)</MenuItem>
                        <MenuItem value="PACK">Package (1OD+1TP)</MenuItem>
                        <MenuItem value="LIAB">Liability Only</MenuItem>
                        <MenuItem value="SOD_A">Standalone OD – With Add-ons</MenuItem>
                        <MenuItem value="SOD_NA">Standalone OD – Without Add-ons</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={geoExtension}
                            onChange={(e) => setGeoExtension(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Geographical Extension"
                        sx={{ fontSize: '0.85rem' }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              {/* DATES & ZONE */}
              <Paper sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                <Box
                  sx={{
                    background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                    color: 'black',
                    p: 1,
                    border: '3px solid #c062c4',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
                    📅 POLICY DATES & ZONE
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        label="Purchase Date"
                        value={purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        label="Policy Start Date"
                        value={policyStartDate}
                        onChange={(e) => setPolicyStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        select
                        size="small"
                        label="Zone"
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                      >
                        <MenuItem value="zonea">Zone A</MenuItem>
                        <MenuItem value="zoneb">Zone B</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Vehicle Age"
                        value={vehicleAge}
                        InputProps={{ readOnly: true }}
                        sx={{ bgcolor: '#f5f5f5' }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              {/* VEHICLE DETAILS */}
              <Paper sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                <Box
                  sx={{
                    background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                    color: 'black',
                    p: 1,
                    border: '3px solid #c062c4',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
                    🚗 VEHICLE DETAILS
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        select
                        size="small"
                        label="Engine Type"
                        value={engineType}
                        onChange={(e) => setEngineType(e.target.value)}
                      >
                        <MenuItem value="PETROL">Petrol / Diesel</MenuItem>
                        <MenuItem value="ELECTRIC">Electric</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="Engine CC / KW"
                        value={engineCC}
                        onChange={(e) => setEngineCC(e.target.value)}
                        placeholder="e.g. 1200"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={biFuel}
                            onChange={(e) => setBiFuel(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Inbuilt Bi-Fuel (CNG/LPG)"
                        sx={{ fontSize: '0.85rem' }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={drivingSchool}
                            onChange={(e) => setDrivingSchool(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Driving School Vehicle"
                        sx={{ fontSize: '0.85rem' }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              {/* SUM INSURED */}
              <Paper sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                <Box
                  sx={{
                    background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                    color: 'black',
                    p: 1,
                    border: '3px solid #c062c4',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
                    💰 SUM INSURED DETAILS
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="Old IDV (₹)"
                        value={oldIDV}
                        onChange={(e) => setOldIDV(e.target.value)}
                        placeholder="0"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="Depreciation % (Optional)"
                        value={depreciation}
                        onChange={(e) => setDepreciation(e.target.value)}
                        placeholder="0"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="New IDV (₹)"
                        value={newIDV}
                        InputProps={{ readOnly: true }}
                        placeholder="0"
                      >
                        {newIDV.toLocaleString('en-IN')}
                      </TextField>
                        <Typography sx={{ fontSize: '0.75rem', color: '#666', mb: 0.5 }}>
                          New IDV (₹)
                        </Typography>
                        <Box
                          sx={{
                            p: 1,
                            bgcolor: '#fff5f5',
                            border: '1.5px solid #ffd0d0',
                            borderRadius: '4px',
                            color: '#c62828',
                            fontWeight: 700,
                          }}
                        >
                          {newIDV.toLocaleString('en-IN')}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="Electrical Fittings SI (₹)"
                        value={electricalSI}
                        onChange={(e) => setElectricalSI(e.target.value)}
                        placeholder="0"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="External CNG/LPG Kit SI (₹)"
                        value={cngSI}
                        onChange={(e) => setCngSI(e.target.value)}
                        placeholder="0"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              {/* DISCOUNTS & NCB */}
              <Paper sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                <Box
                  sx={{
                    background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                    color: 'black',
                    p: 1,
                    border: '3px solid #c062c4',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
                    💸 DISCOUNTS & NCB
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        select
                        size="small"
                        label="NCB %"
                        value={ncb}
                        onChange={(e) => setNcb(e.target.value)}
                      >
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="0">0%</MenuItem>
                        <MenuItem value="20">20%</MenuItem>
                        <MenuItem value="25">25%</MenuItem>
                        <MenuItem value="35">35%</MenuItem>
                        <MenuItem value="45">45%</MenuItem>
                        <MenuItem value="50">50%</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="OD Discount % (Optional)"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="0"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}>
                        Discount Applicable Add-ons:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={nd}
                            onChange={(e) => setNd(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Nil Dep"
                      />
                      {nd && (
                        <Box sx={{ ml: 4, mt: 1 }}>
                          <TextField
                            fullWidth
                            select
                            size="small"
                            label="Type"
                            value={ndType}
                            onChange={(e) => setNdType(e.target.value)}
                            sx={{ mb: 1 }}
                          >
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="1YEAR">1 Year</MenuItem>
                            <MenuItem value="3YEAR">3 Year</MenuItem>
                            <MenuItem value="5YEAR">5 Year</MenuItem>
                          </TextField>
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            label="Disc %"
                            value={ndDisc}
                            onChange={(e) => setNdDisc(Number(e.target.value))}
                          />
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rti}
                            onChange={(e) => setRti(e.target.checked)}
                            size="small"
                          />
                        }
                        label="RTI"
                      />
                      {rti && (
                        <Box sx={{ ml: 4, mt: 1 }}>
                          <TextField
                            fullWidth
                            select
                            size="small"
                            label="Type"
                            value={rtiType}
                            onChange={(e) => setRtiType(e.target.value)}
                            sx={{ mb: 1 }}
                          >
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="BASIC">Basic</MenuItem>
                            <MenuItem value="COMP">Comprehensive</MenuItem>
                          </TextField>
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            label="Disc %"
                            value={rtiDisc}
                            onChange={(e) => setRtiDisc(Number(e.target.value))}
                          />
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={ep}
                            onChange={(e) => setEp(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Engine Protect"
                      />
                      {ep && (
                        <Box sx={{ ml: 4, mt: 1 }}>
                          <TextField
                            fullWidth
                            select
                            size="small"
                            label="Type"
                            value={epType}
                            onChange={(e) => setEpType(e.target.value)}
                            sx={{ mb: 1 }}
                          >
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="BASIC">Basic</MenuItem>
                            <MenuItem value="COMP">Comprehensive</MenuItem>
                          </TextField>
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            label="Disc %"
                            value={epDisc}
                            onChange={(e) => setEpDisc(Number(e.target.value))}
                          />
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={cm}
                            onChange={(e) => setCm(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Consumables"
                      />
                      {cm && (
                        <Box sx={{ ml: 4, mt: 1 }}>
                          <TextField
                            fullWidth
                            select
                            size="small"
                            label="Type"
                            value={cmType}
                            onChange={(e) => setCmType(e.target.value)}
                            sx={{ mb: 1 }}
                          >
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="1YEAR">1 Year</MenuItem>
                            <MenuItem value="2YEAR">2 Year</MenuItem>
                          </TextField>
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            label="Disc %"
                            value={cmDisc}
                            onChange={(e) => setCmDisc(Number(e.target.value))}
                          />
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={hp}
                            onChange={(e) => setHp(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Hybrid Protect"
                      />
                      {hp && (
                        <Box sx={{ ml: 4, mt: 1, display: 'flex', gap: 1 }}>
                          <TextField
                            select
                            size="small"
                            label="Type"
                            value={hpType}
                            onChange={(e) => setHpType(e.target.value)}
                            sx={{ flex: 1 }}
                          >
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="BASIC">Basic</MenuItem>
                            <MenuItem value="COMP">Comprehensive</MenuItem>
                          </TextField>
                          <TextField
                            size="small"
                            type="number"
                            label="Disc %"
                            value={hpDisc}
                            onChange={(e) => setHpDisc(Number(e.target.value))}
                            sx={{ flex: 1 }}
                          />
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              {/* ADD-ON ENHANCEMENT COVERAGES */}
              <Paper sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                <Box
                  sx={{
                    background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                    color: 'black',
                    p: 1,
                    border: '3px solid #c062c4',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
                    ⭐ ADD-ON ENHANCEMENT COVERAGES
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={bp}
                            onChange={(e) => setBp(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Battery Protect"
                      />
                      {bp && (
                        <Box sx={{ ml: 4, mt: 1 }}>
                          <TextField
                            fullWidth
                            select
                            size="small"
                            label="Type"
                            value={bpType}
                            onChange={(e) => setBpType(e.target.value)}
                            sx={{ mb: 1 }}
                          >
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="UL">Unlimited Claims</MenuItem>
                            <MenuItem value="GOLD">Gold</MenuItem>
                          </TextField>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={bp2ClaimRemove}
                                onChange={(e) => setBp2ClaimRemove(e.target.checked)}
                                size="small"
                              />
                            }
                            label="Remove 2-Claim Limit"
                          />
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={bc}
                            onChange={(e) => setBc(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Battery Charger"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={epAddon}
                            onChange={(e) => setEpAddon(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Engine Protect"
                      />
                      {epAddon && (
                        <TextField
                          fullWidth
                          select
                          size="small"
                          label="Type"
                          value={epAddonType}
                          onChange={(e) => setEpAddonType(e.target.value)}
                          sx={{ mt: 1 }}
                        >
                          <MenuItem value="">-- Select --</MenuItem>
                          <MenuItem value="BASIC">Basic</MenuItem>
                          <MenuItem value="COMP">Comprehensive</MenuItem>
                        </TextField>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={ndAddon}
                            onChange={(e) => setNdAddon(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Nil Dep"
                      />
                      {ndAddon && (
                        <TextField
                          fullWidth
                          select
                          size="small"
                          label="Type"
                          value={ndAddonType}
                          onChange={(e) => setNdAddonType(e.target.value)}
                          sx={{ mt: 1 }}
                        >
                          <MenuItem value="">-- Select --</MenuItem>
                          <MenuItem value="1YEAR">1 Year</MenuItem>
                          <MenuItem value="3YEAR">3 Year</MenuItem>
                          <MenuItem value="5YEAR">5 Year</MenuItem>
                        </TextField>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rtiAddon}
                            onChange={(e) => setRtiAddon(e.target.checked)}
                            size="small"
                          />
                        }
                        label="RTI"
                      />
                      {rtiAddon && (
                        <TextField
                          fullWidth
                          select
                          size="small"
                          label="Type"
                          value={rtiAddonType}
                          onChange={(e) => setRtiAddonType(e.target.value)}
                          sx={{ mt: 1 }}
                        >
                          <MenuItem value="">-- Select --</MenuItem>
                          <MenuItem value="BASIC">Basic</MenuItem>
                          <MenuItem value="COMP">Comprehensive</MenuItem>
                        </TextField>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={cmAddon}
                            onChange={(e) => setCmAddon(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Consumables"
                      />
                      {cmAddon && (
                        <TextField
                          fullWidth
                          select
                          size="small"
                          label="Type"
                          value={cmAddonType}
                          onChange={(e) => setCmAddonType(e.target.value)}
                          sx={{ mt: 1 }}
                        >
                          <MenuItem value="">-- Select --</MenuItem>
                          <MenuItem value="1YEAR">1 Year</MenuItem>
                          <MenuItem value="2YEAR">2 Year</MenuItem>
                        </TextField>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={hpAddon}
                            onChange={(e) => setHpAddon(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Hybrid Protect"
                      />
                      {hpAddon && (
                        <TextField
                          fullWidth
                          select
                          size="small"
                          label="Type"
                          value={hpAddonType}
                          onChange={(e) => setHpAddonType(e.target.value)}
                          sx={{ mt: 1 }}
                        >
                          <MenuItem value="">-- Select --</MenuItem>
                          <MenuItem value="BASIC">Basic</MenuItem>
                          <MenuItem value="COMP">Comprehensive</MenuItem>
                        </TextField>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tow}
                            onChange={(e) => setTow(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Additional Towing Charges"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={loc}
                            onChange={(e) => setLoc(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Loss of Contents"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={pb}
                            onChange={(e) => setPb(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Personal Belongings"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={kp}
                            onChange={(e) => setKp(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Key Protect"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={ta}
                            onChange={(e) => setTa(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Tyre & Alloy"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={ncbp}
                            onChange={(e) => setNcbp(e.target.checked)}
                            size="small"
                          />
                        }
                        label="NCB Protection"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={hvpa}
                            onChange={(e) => setHvpa(e.target.checked)}
                            size="small"
                          />
                        }
                        label="High Value PA"
                      />
                      {hvpa && (
                        <TextField
                          fullWidth
                          select
                          size="small"
                          label="Seats (incl. driver)"
                          value={hvpaCount}
                          onChange={(e) => setHvpaCount(Number(e.target.value))}
                          sx={{ mt: 1 }}
                        >
                          <MenuItem value={0}>0</MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                          <MenuItem value={7}>7</MenuItem>
                          <MenuItem value={8}>8</MenuItem>
                          <MenuItem value={9}>9</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                        </TextField>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rsaCheck}
                            onChange={(e) => setRsaCheck(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Roadside Assistance"
                      />
                      {rsaCheck && (
                        <TextField
                          fullWidth
                          select
                          size="small"
                          label="Type"
                          value={rsa}
                          onChange={(e) => setRsa(e.target.value)}
                          sx={{ mt: 1 }}
                        >
                          <MenuItem value="">-- Select --</MenuItem>
                          <MenuItem value="50">Basic – ₹50</MenuItem>
                          <MenuItem value="60">Gold – ₹60</MenuItem>
                        </TextField>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              {/* ADDITIONAL LIABILITY COVERS */}
              <Paper sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                <Box
                  sx={{
                    background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                    color: 'black',
                    p: 1,
                    border: '3px solid #c062c4',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
                    🛡️ ADDITIONAL LIABILITY COVERS
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={pa}
                            onChange={(e) => setPa(e.target.checked)}
                            size="small"
                          />
                        }
                        label="CPA Owner Driver"
                      />
                      {pa && (
                        <TextField
                          fullWidth
                          select
                          size="small"
                          label="Coverage"
                          value={paDuration}
                          onChange={(e) => setPaDuration(e.target.value)}
                          sx={{ mt: 1 }}
                        >
                          <MenuItem value="FY">First Year Only</MenuItem>
                          <MenuItem value="FULL">Full Policy Duration</MenuItem>
                        </TextField>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={llpd}
                            onChange={(e) => setLlpd(e.target.checked)}
                            size="small"
                          />
                        }
                        label="LL to Paid Driver"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tppdLimit}
                            onChange={(e) => setTppdLimit(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Restrict TPPD Statutory Limit to ₹6,000"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={unpa}
                            onChange={(e) => setUnpa(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Unnamed PA"
                      />
                      {unpa && (
                        <Box sx={{ ml: 4, mt: 1, display: 'flex', gap: 1 }}>
                          <TextField
                            select
                            size="small"
                            label="No. of Persons"
                            value={unpaCount}
                            onChange={(e) => setUnpaCount(Number(e.target.value))}
                            sx={{ flex: 1 }}
                          >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                          </TextField>
                          <TextField
                            select
                            size="small"
                            label="Sum Insured (₹)"
                            value={unpaSI}
                            onChange={(e) => setUnpaSI(Number(e.target.value))}
                            sx={{ flex: 1 }}
                          >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={10000}>₹10,000</MenuItem>
                            <MenuItem value={20000}>₹20,000</MenuItem>
                            <MenuItem value={30000}>₹30,000</MenuItem>
                            <MenuItem value={40000}>₹40,000</MenuItem>
                            <MenuItem value={50000}>₹50,000</MenuItem>
                            <MenuItem value={60000}>₹60,000</MenuItem>
                            <MenuItem value={70000}>₹70,000</MenuItem>
                            <MenuItem value={80000}>₹80,000</MenuItem>
                            <MenuItem value={90000}>₹90,000</MenuItem>
                            <MenuItem value={100000}>₹1,00,000</MenuItem>
                            <MenuItem value={110000}>₹1,10,000</MenuItem>
                            <MenuItem value={120000}>₹1,20,000</MenuItem>
                            <MenuItem value={130000}>₹1,30,000</MenuItem>
                            <MenuItem value={140000}>₹1,40,000</MenuItem>
                            <MenuItem value={150000}>₹1,50,000</MenuItem>
                            <MenuItem value={160000}>₹1,60,000</MenuItem>
                            <MenuItem value={170000}>₹1,70,000</MenuItem>
                            <MenuItem value={180000}>₹1,80,000</MenuItem>
                            <MenuItem value={190000}>₹1,90,000</MenuItem>
                            <MenuItem value={200000}>₹2,00,000</MenuItem>
                          </TextField>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={paPd}
                            onChange={(e) => setPaPd(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Personal Accident for Paid Driver"
                      />
                      {paPd && (
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          label="Sum Insured (₹)"
                          value={paPdSI}
                          onChange={(e) => setPaPdSI(e.target.value)}
                          placeholder="Enter SI"
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              {/* AGENT / OFFICE DETAILS */}
              <Paper sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                <Box
                  sx={{
                    background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                    color: 'black',
                    p: 1,
                    border: '3px solid #c062c4',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
                    👤 AGENT / OFFICE DETAILS <Typography component="span" sx={{ opacity: 0.6, fontSize: '0.7rem', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(Optional)</Typography>
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Agent Name"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        placeholder="e.g. Ravi Sharma"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Agent Mobile"
                        value={agentMobile}
                        onChange={(e) => setAgentMobile(e.target.value)}
                        placeholder="e.g. 9876543210"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Agent Email"
                        value={agentEmail}
                        onChange={(e) => setAgentEmail(e.target.value)}
                        placeholder="e.g. ravi@example.com"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Office Code"
                        value={officeCode}
                        onChange={(e) => setOfficeCode(e.target.value)}
                        placeholder="e.g. CHN001"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Office Name"
                        value={officeName}
                        onChange={(e) => setOfficeName(e.target.value)}
                        placeholder="e.g. Chennai Branch"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Officer Name"
                        value={officerName}
                        onChange={(e) => setOfficerName(e.target.value)}
                        placeholder="e.g. Sundar Rajan"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* RIGHT COLUMN - PREMIUM SUMMARY */}
          <Grid item xs={12} md={6} sx={{width:'100%'}}>
            <Paper sx={{ overflow: 'hidden', position: 'sticky', top: 80 }}>
              {/* Hero Amount */}
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #c062c4, #616161)',
                  p: 3,
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.6)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    mb: 1,
                  }}
                >
                  Total Premium
                </Typography>
                <Typography
                  sx={{
                    fontSize: '2.5rem',
                    color: 'white',
                    fontWeight: 700,
                    fontFamily: '"DM Serif Display", serif',
                  }}
                >
                  ₹{totalPremium.toLocaleString('en-IN')}
                </Typography>
              </Box>

              {/* Premium Breakdown */}
              <Box>
                <Box
                  sx={{
                    bgcolor: '#f4f6fd',
                    p: 1,
                    borderBottom: '1px solid #e8edf8',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: '#c062c4',
                    }}
                  >
                    Premium Breakdown
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderBottom: '1px solid #f0f2f8',
                  }}
                >
                  <Typography sx={{ color: '#5a6380' }}>OD Premium</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    ₹{odPremium.toLocaleString('en-IN')}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderBottom: '1px solid #f0f2f8',
                  }}
                >
                  <Typography sx={{ color: '#5a6380' }}>TP Premium</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    ₹{tpPremium.toLocaleString('en-IN')}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderBottom: '1px solid #f0f2f8',
                  }}
                >
                  <Typography sx={{ color: '#5a6380' }}>Add-on Premium</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    ₹{addOnPremium.toLocaleString('en-IN')}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    bgcolor: '#e8edf8',
                    fontWeight: 700,
                    borderTop: '2px solid #cdd5ee',
                    borderBottom: '2px solid #cdd5ee',
                  }}
                >
                  <Typography sx={{ color: '#c062c4' }}>Subtotal</Typography>
                  <Typography sx={{ color: '#c062c4' }}>
                    ₹{(odPremium + tpPremium + addOnPremium).toLocaleString('en-IN')}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    bgcolor: '#fff8e8',
                    fontWeight: 600,
                    borderBottom: '1px solid #f0f2f8',
                  }}
                >
                  <Typography sx={{ color: '#8a5c00' }}>GST (18%)</Typography>
                  <Typography sx={{ color: '#8a5c00' }}>
                    ₹{gst.toLocaleString('en-IN')}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #c062c4, #616161)',
                    p: 1.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.75)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Grand Total
                  </Typography>
                  <Typography
                    sx={{
                      color: 'white',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      fontFamily: '"DM Serif Display", serif',
                    }}
                  >
                    ₹{totalPremium.toLocaleString('en-IN')}
                  </Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<CalculateIcon />}
                  onClick={handleCalculate}
                  sx={{
                    background: 'linear-gradient(135deg, #1a7f4b, #1d9155)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1a7f4b, #1d9155)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Calculate
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/quote')}
                  sx={{
                    borderColor: '#c062c4',
                    color: '#c062c4',
                    '&:hover': {
                      borderColor: '#c062c4',
                      bgcolor: 'rgba(66, 66, 66, 0.04)',
                    },
                  }}
                >
                  Back
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      {/* <Box
        sx={{
          background: 'linear-gradient(135deg, #c062c4, #616161)',
          p: 1.5,
          mt: 4,
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.3px',
          }}
        >
          © 2026 Vehicle Insurance - All Rights Reserved
        </Typography>
      </Box> */}
    </Box>
  );
}