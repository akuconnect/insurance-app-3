import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CalculateIcon from '@mui/icons-material/Calculate';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import '../PrintTarget.css';

export function CommercialMotor() {
  const navigate = useNavigate();
  
  // Basic Details
  const [proposerName, setProposerName] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [classSubType, setClassSubType] = useState('');
  const [productType, setProductType] = useState('');
  const [geoExtension, setGeoExtension] = useState(false);
  
  // Dates & Zone
  const [purchaseDate, setPurchaseDate] = useState('');
  const [policyStartDate, setPolicyStartDate] = useState('');
  const [zone, setZone] = useState('zonea');
  const [vehicleAge, setVehicleAge] = useState('â€” months');
  
  // Vehicle Details
  const [engineType, setEngineType] = useState('DIESEL');
  const [gvw, setGvw] = useState(''); // Gross Vehicle Weight
  const [carryingCapacity, setCarryingCapacity] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [trailerAttached, setTrailerAttached] = useState(false);
  
  // Sum Insured
  const [oldIDV, setOldIDV] = useState('');
  const [depreciation, setDepreciation] = useState('');
  const [newIDV, setNewIDV] = useState(0);
  const [imt23, setImt23] = useState(false);
  const [electricalSI, setElectricalSI] = useState('');
  const [nonElecSI, setNonElecSI] = useState('');
  const [additionalTowingSI, setAdditionalTowingSI] = useState('');
  const [externalCngSI, setExternalCngSI] = useState('');
  
  // Premium Summary
  const [odPremium, setOdPremium] = useState(0);
  const [tpPremium, setTpPremium] = useState(0);
  const [addOnPremium, setAddOnPremium] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalPremium, setTotalPremium] = useState(0);
  
  // OD Components
  const [odBasic, setOdBasic] = useState(0);
  const [odImt23, setOdImt23] = useState(0);
  const [odBifuel, setOdBifuel] = useState(0);
  const [odExtCng, setOdExtCng] = useState(0);
  const [odElec, setOdElec] = useState(0);
  const [odNonElec, setOdNonElec] = useState(0);
  const [odTow, setOdTow] = useState(0);
  const [odNilDep, setOdNilDep] = useState(0);
  const [odConsumables, setOdConsumables] = useState(0);
  const [odBattery, setOdBattery] = useState(0);
  const [odWallCharger, setOdWallCharger] = useState(0);
  const [odNcb, setOdNcb] = useState(0);
  const [odAtd, setOdAtd] = useState(0);
  const [odTotalBreakdown, setOdTotalBreakdown] = useState(0);
  
  // TP Components
  const [tpBasic, setTpBasic] = useState(0);
  const [tpCpaOwner, setTpCpaOwner] = useState(0);
  const [tpLlpd, setTpLlpd] = useState(0);
  const [tpLlnfpp, setTpLlnfpp] = useState(0);
  const [tpPaDc, setTpPaDc] = useState(0);
  const [tpExtCng, setTpExtCng] = useState(0);
  const [tpBifuel, setTpBifuel] = useState(0);
  const [tpTppdDisc, setTpTppdDisc] = useState(0);
  const [tpTotalBreakdown, setTpTotalBreakdown] = useState(0);
  const [geoExtAmt, setGeoExtAmt] = useState(0);
  
  // DISCOUNTS & NCB
  const [odDiscount, setOdDiscount] = useState(0);
  const [ncb, setNcb] = useState('0');
  const [antiTheftDevice, setAntiTheftDevice] = useState(false);
  
  // ADDITIONAL LIABILITY COVERS
  const [cpaOwnerDriver, setCpaOwnerDriver] = useState(false);
  const [restrictTppd, setRestrictTppd] = useState(false);
  const [llToNfpp, setLlToNfpp] = useState(false);
  const [llToNfppCount, setLlToNfppCount] = useState(1);
  const [llStaff, setLlStaff] = useState(false);
  const [llStaffCount, setLlStaffCount] = useState(1);
  const [paStaff, setPaStaff] = useState(false);
  const [paStaffCount, setPaStaffCount] = useState(1);
  const [paStaffSI, setPaStaffSI] = useState('0');
  
  // AGENT / OFFICE DETAILS
  const [agentName, setAgentName] = useState('');
  const [agentMobile, setAgentMobile] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [officeCode, setOfficeCode] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [officerName, setOfficerName] = useState('');

  // dictionaries for dropdowns
  const dictVehicleType = new Map();
  dictVehicleType.set("A1", "Other than 3W – Public [A1]");
  dictVehicleType.set("A2", "Private Carrier [A2]");
  dictVehicleType.set("A3", "3 Wheeler – Public [A3]");
  dictVehicleType.set("A4", "3 Wheeler – Private [A4]");

  const dictPolicyType = new Map();
  dictPolicyType.set("PACK", "Package (OD+TP)");
  dictPolicyType.set("LIAB", "Liability Only (TP)");
  dictPolicyType.set("SOD", "Standalone OD");

  const dictFuelType = new Map();
  dictFuelType.set("PETROL", "Petrol");
  dictFuelType.set("DIESEL", "Diesel");
  dictFuelType.set("ELECTRIC", "Electric");
  dictFuelType.set("CNG", "CNG");

  const dictZone = new Map();
  dictZone.set("zonea", "Zone A");
  dictZone.set("zoneb", "Zone B");
  dictZone.set("zonec", "Zone C");

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
      setVehicleAge('months');
    }
  }, [purchaseDate, policyStartDate]);
  
  // Helper functions for calculation
  const completedYears = () => {
    if (!purchaseDate || !policyStartDate) return 1;
    const purchase = new Date(purchaseDate);
    const start = new Date(policyStartDate);
    let yrs = start.getFullYear() - purchase.getFullYear();
    const anniv = new Date(start.getFullYear(), purchase.getMonth(), purchase.getDate());
    if (start < anniv) yrs--;
    if (yrs < 0) yrs = 0;
    return yrs + 1;
  };

  const odRate = (zone, vclass, vehAge) => {
    // A1 - Public Carrier
    if (vclass === "A1") {
      if (zone === "zonea") {
        if (vehAge <= 5) return 1.751;
        if (vehAge <= 7) return 1.795;
        return 1.839;
      }
      if (zone === "zoneb") {
        if (vehAge <= 5) return 1.743;
        if (vehAge <= 7) return 1.787;
        return 1.830;
      }
      if (zone === "zonec") {
        if (vehAge <= 5) return 1.726;
        if (vehAge <= 7) return 1.770;
        return 1.812;
      }
    }

    /* A2 – Private Carrier (CORRECTED) */
    if (vclass === "A2") {

        if (zone === "zonea") {
            if (vehAge <= 5) return 1.226;
            if (vehAge <= 7) return 1.257;
            return 1.287;
        }

        if (zone === "zoneb") {
            if (vehAge <= 5) return 1.220;
            if (vehAge <= 7) return 1.251;
            return 1.281;
        }

        if (zone === "zonec") {
            if (vehAge <= 5) return 1.208;
            if (vehAge <= 7) return 1.239;
            return 1.268;
        }
    }
    /* 3 WHEELER – PUBLIC CARRIER */
    if (vclass === "A3") {

        if (zone === "zonea") {
            if (vehAge <= 5) return 1.664;
            if (vehAge <= 7) return 1.706;
            return 1.747;
        }

        if (zone === "zoneb") {
            if (vehAge <= 5) return 1.656;
            if (vehAge <= 7) return 1.697;
            return 1.739;
        }

        if (zone === "zonec") {
            if (vehAge <= 5) return 1.640;
            if (vehAge <= 7) return 1.681;
            return 1.722;
        }
    }

    /* 3 WHEELER – PRIVATE CARRIER */
    if (vclass === "A4") {

        if (zone === "zonea") {
            if (vehAge <= 5) return 1.165;
            if (vehAge <= 7) return 1.194;
            return 1.223;
        }

        if (zone === "zoneb") {
            if (vehAge <= 5) return 1.159;
            if (vehAge <= 7) return 1.188;
            return 1.217;
        }

        if (zone === "zonec") {
            if (vehAge <= 5) return 1.148;
            if (vehAge <= 7) return 1.177;
            return 1.205;
        }
    }

    return 0;
  };

  const tpRate = (vclass, fuelType, gvw) => {
    if (vclass === "A1" || vclass === "A2") {
      const slab = gvw < 7500 ? "<7500" : gvw < 12000 ? "<12000" : gvw < 20000 ? "<20000" : gvw < 40000 ? "<40000" : ">40000";
      const NON_ELECTRIC = { "<7500": 16049, "<12000": 27186, "<20000": 35313, "<40000": 43950, ">40000": 44242 };
      const ELECTRIC = { "<7500": 13642, "<12000": 23108, "<20000": 30016, "<40000": 37357, ">40000": 37606 };
      return fuelType === "ELECTRIC" ? ELECTRIC[slab] : NON_ELECTRIC[slab];
    }
    // THREE WHEELERS
    if (vclass === "A3") {
        return fuelType === "ELECTRIC" ? 3139 : 4492;
    }

    if (vclass === "A4") {
        return fuelType === "ELECTRIC" ? 3211 : 3922;
    }
    return 0;
  };

  const handleCalculate = () => {
    //const vclass = vehicleType === "GCV" ? "GCV" : "GCV"; // Default to GCV for commercial
    const vclass = vehicleType;
    const prod = productType === "PACK" ? "PACKAGE" : productType === "LIAB" ? "LIAB" : "PACKAGE";
    const fuel = engineType === "ELECTRIC" ? "ELECTRIC" : "NON_ELECTRIC";
    
    // Basic validation
    if (!vclass || !prod) {
      alert("Select Vehicle Type & Product Type");
      return;
    }
    
    if (vclass === "A1" && !gvw) {
      alert("Enter GVW");
      return;
    }
    
    if (prod !== "LIAB") {
      if (!purchaseDate || !policyStartDate) {
        alert("Enter Purchase Date and Policy Start Date");
        return;
      }
    }
    
    let vehAge = completedYears();
    if (vehAge < 1) vehAge = 1;
    
    // ===== ADDITIONAL TOWING CHARGES =====
    let towOD_calc = 0;
    const towSI = Number(additionalTowingSI) || 0;
    
    if (prod !== "LIAB" && towSI > 0) {
      if (towSI <= 10000) {
        towOD_calc = towSI * 0.05;
      } else {
        towOD_calc = towSI * 0.075;
      }
    }
    
    // ===== GEOGRAPHICAL EXTENSION =====
    let geoExt_calc = 0;
    if (geoExtension) {
      geoExt_calc = (prod === "LIAB") ? 100 : 500;
    }
    
    // ===== OD CALCULATION =====
    let odTotal_calc = 0;
    let odBasic_calc = 0;
    let odImt23_calc = 0;
    let odBifuel_calc = 0;
    let odExtCng_calc = 0;
    let odElec_calc = 0;
    let odNonElec_calc = 0;
    let odNcb_calc = 0;
    let odAtd_calc = 0;
    
    if (prod !== "LIAB") {
      // BASE OD (Rate + GVW Excess)
      console.log("New IDV:", newIDV);
      const baseOD = (newIDV * odRate(zone, vclass, vehAge) / 100) + (gvw > 12000 ? Math.ceil((gvw - 12000) / 100) * 27 : 0);
      console.log("Base OD:", baseOD);
      // DISCOUNT
      const discountPct = Number(odDiscount) || 0;
      const discountedOD = baseOD - (baseOD * discountPct / 100);
      odBasic_calc = discountedOD;
      
      // ACCESSORY SI
      const elecSI = Number(electricalSI) || 0;
      const nonElecSI_val = Number(nonElecSI) || 0;
      
      // Non-Electrical Accessories OD
      if (nonElecSI_val > 0) {
        odNonElec_calc = nonElecSI_val * odRate(zone, vclass, vehAge) / 100;
        odNonElec_calc = odNonElec_calc - (odNonElec_calc * discountPct / 100);
      }
      
      // Electrical Fittings OD
      if (elecSI > 0) {
        odElec_calc = elecSI * 0.04;
        odElec_calc = odElec_calc - (odElec_calc * discountPct / 100);
      }
      
      // EXTERNAL CNG/LPG OD
      const extSI = Number(externalCngSI) || 0;
      if (extSI >= 10000) {
        const extCngBase = extSI * 0.04;
        odExtCng_calc = extCngBase - (extCngBase * discountPct / 100);
      }
      
      // IMT 23
      const imt23Base = discountedOD + odElec_calc + odNonElec_calc + odExtCng_calc;
      odImt23_calc = imt23 ? imt23Base * 0.15 : 0;
      
      // SUBTOTAL BEFORE NCB
      const odBeforeNCB = discountedOD + odElec_calc + odNonElec_calc + odImt23_calc + towOD_calc;
      
      // NCB
      const ncbPct = Number(ncb) || 0;
      odNcb_calc = odBeforeNCB * ncbPct / 100;
      const afterNCB = odBeforeNCB - odNcb_calc;
      
      // ANTI-THEFT (AFTER NCB)
      odAtd_calc = antiTheftDevice ? Math.min(afterNCB * 0.025, 500) : 0;
      const netOD = afterNCB - odAtd_calc;
      
      odTotal_calc = netOD + geoExt_calc;
    }
    
    // ===== TP CALCULATION =====
    const tp = tpRate(vclass, fuel, Number(gvw));
    const pa = cpaOwnerDriver ? 275 : 0;
    const llpd = llStaff ? Number(llStaffCount) * 50 : 0;
    const llnfpp = llToNfpp ? Number(llToNfppCount) * 75 : 0;
    
    let paPDC = 0;
    if (paStaff && paStaffSI !== '0') {
      const basePremium = (Number(paStaffSI) / 10000) * 6 * Number(paStaffCount);
      const extraCharge = 50 * Number(paStaffCount);
      paPDC = basePremium + extraCharge;
    }
    
    const tppdDisc = restrictTppd ? 200 : 0;
    
    // External CNG TP
    const extCngTP = (fuel !== "ELECTRIC" && Number(externalCngSI) >= 10000) ? 60 : 0;
    
    const tpTotal_calc = tp + pa + llpd + llnfpp + paPDC + extCngTP + (prod === "LIAB" ? geoExt_calc : 0) - tppdDisc;
    
    // ===== GST CALCULATION =====
    const gstOnBasicTP = (tp + extCngTP) * 0.05;
    let gstBase18 = odTotal_calc + pa + llpd + llnfpp + paPDC;
    
    if (prod === "LIAB" && geoExt_calc > 0) {
      gstBase18 += geoExt_calc;
    }
    
    const gstOnOthers = gstBase18 * 0.18;
    const totalGST = gstOnBasicTP + gstOnOthers;
    
    // ===== FINAL TOTAL =====
    const grandTotal = odTotal_calc + tpTotal_calc + totalGST;
    
    // Set all state variables
    setOdBasic(Math.round(odBasic_calc));
    setOdImt23(Math.round(odImt23_calc));
    setOdBifuel(0); // Not applicable for commercial
    setOdExtCng(Math.round(odExtCng_calc));
    setOdElec(Math.round(odElec_calc));
    setOdNonElec(Math.round(odNonElec_calc));
    setOdTow(Math.round(towOD_calc));
    setOdNilDep(0); // Not applicable for commercial
    setOdConsumables(0); // Not applicable for commercial
    setOdBattery(0); // Not applicable for commercial
    setOdWallCharger(0); // Not applicable for commercial
    setOdNcb(Math.round(odNcb_calc));
    setOdAtd(Math.round(odAtd_calc));
    setOdTotalBreakdown(Math.round(odTotal_calc));
    
    setTpBasic(Math.round(tp));
    setTpCpaOwner(Math.round(pa));
    setTpLlpd(Math.round(llpd));
    setTpLlnfpp(Math.round(llnfpp));
    setTpPaDc(Math.round(paPDC));
    setTpExtCng(Math.round(extCngTP));
    setTpBifuel(0); // Not applicable for commercial
    setTpTppdDisc(Math.round(tppdDisc));
    setTpTotalBreakdown(Math.round(tpTotal_calc));
    setGeoExtAmt(Math.round(geoExt_calc));
    
    setOdPremium(Math.round(odTotal_calc));
    setTpPremium(Math.round(tpTotal_calc));
    setGst(Math.round(totalGST));
    setTotalPremium(Math.round(grandTotal));
  };

  function buildPdfTarget() {
            const pname = proposerName || '–';
            const regno = registrationNo || '–';
            const vclass = dictVehicleType.get(vehicleType) || '–';
            const prod = dictPolicyType.get(productType) || '–';
            const fuel = dictFuelType.get(engineType) || '–';
            const zoneVal = dictZone.get(zone) || '–';
            const gvwVal = gvw || '–';
            const rsdate = policyStartDate || '–';
            const rdate = purchaseDate || '–';
            const nidv = newIDV || '0';
            const agent = agentName || '–';
            const office = officeName || '–';
            const officer = officerName || '–';
            const grandTotal = totalPremium || '0';

            const gt = id => document.getElementById(id)?.textContent || '₹ 0';
            const isZ = id => !document.getElementById(id) || document.getElementById(id).textContent.replace(/[₹\s,]/g, '') === '0';

            const col = document.getElementById('pdf-print-target');
            col.innerHTML = '';

            /* Header info band */
            const hdr = document.createElement('div');
            hdr.innerHTML = `
            <div class="ph"><h1>Motor Premium Quote – Goods Carrying Vehicle</h1></div>
            <div class="gold-bar"></div>

            <div class="info-band">

            <!-- Row 1 -->
            <div class="info-row info-row-5">
            <div class="info-cell"><div class="ic-lbl">Proposer Name</div><div class="ic-val">${pname}</div></div>
            <div class="info-cell"><div class="ic-lbl">Registration No</div><div class="ic-val">${regno}</div></div>
            <div class="info-cell"><div class="ic-lbl">Vehicle Class</div><div class="ic-val">${vclass}</div></div>
            <div class="info-cell"><div class="ic-lbl">Fuel Type</div><div class="ic-val">${fuel}</div></div>
            <div class="info-cell"><div class="ic-lbl">GVW (Kg)</div><div class="ic-val">${gvwVal}</div></div>
            </div>

            <div class="info-divider"></div>

            <!-- Row 2 -->
            <div class="info-row info-row-5">
            <div class="info-cell"><div class="ic-lbl">Product Type</div><div class="ic-val">${prod}</div></div>
            <div class="info-cell"><div class="ic-lbl">Zone</div><div class="ic-val">${zoneVal}</div></div>
            <div class="info-cell"><div class="ic-lbl">IDV</div><div class="ic-val">${nidv}</div></div>
            <div class="info-cell"><div class="ic-lbl">Purchase Date</div><div class="ic-val">${rdate}</div></div>
            <div class="info-cell"><div class="ic-lbl">Policy Start Date</div><div class="ic-val">${rsdate}</div></div>
            </div>

            <div class="info-divider"></div>

            <!-- Row 3 -->
            <div class="info-row info-row-5">
            <div class="info-cell"><div class="ic-lbl">Agent Name</div><div class="ic-val">${agent}</div></div>
            <div class="info-cell"><div class="ic-lbl">Agent Mobile</div><div class="ic-val">${agentMobile || '–'}</div></div>
            <div class="info-cell"><div class="ic-lbl">Agent Email</div><div class="ic-val">${agentEmail || '–'}</div></div>
            <div class="info-cell"><div class="ic-lbl">Officer Name</div><div class="ic-val">${officer}</div></div>
            <div class="info-cell"><div class="ic-lbl">Office Code & Name</div><div class="ic-val">${officeCode || '–'} ${office}</div></div>
            </div>

            </div>
            `;
            col.appendChild(hdr);

            /* Premium table helpers */
            function addSec(t) {
                const d = document.createElement('div');
                d.style.cssText = `
                background:#eef1f9;
                color:#c062c4;
                padding:10px 16px;
                font-size:.72rem;
                font-weight:700;
                letter-spacing:1.2px;
                text-transform:uppercase;
                border-left:4px solid #c062c4;
                border-bottom:1px solid #cdd5ee;
                align-items: center;
                vertical-align: middle;
              `;
                d.textContent = t;
                col.appendChild(d);
            }

            function addRow(lbl, id, rowValue, force ) {
                if (!force && rowValue === 0) return;

                const el = document.getElementById(id);

                /* read label from on-screen summary */
                const screenRow = el?.closest('.pl');
                let labelText = screenRow?.querySelector('.lbl')?.textContent || lbl;

                /* CUSTOMER COPY: remove OD and Nil Dep discount brackets */
                // if (customerCopyMode) {

                    if (labelText.startsWith("Basic OD")) {
                        labelText = labelText.replace(/\s*\(Disc:[^)]+\)/, '');
                    }

                    if (labelText.startsWith("Nil Depreciation")) {
                        labelText = labelText.replace(/\s*\(Disc:[^)]+\)/, '');
                    }

                // }

                const d = document.createElement('table');
                d.style.cssText = 'width:100%;border-collapse:collapse;';

                d.innerHTML = `<tr style="border-bottom:1px solid #f0f2f8;">
    <td style="padding:6px 16px;font-size:16px;color:#5a6380;width:70%;">${labelText}</td>
    <td style="padding:6px 16px;font-size:16px;font-weight:700;color:#1a1f36;text-align:right;white-space:nowrap;">${rowValue}</td>
  </tr>`;

                col.appendChild(d);

            }

            function addSub(lbl, id) {
                const d = document.createElement('div');
                d.className = 'p-subtot';
                d.innerHTML = `<span>${lbl}</span><span>${id}</span>`;
                col.appendChild(d);
            }

            const pv = productType;
            const disc = +odDiscount?.value || 0;
            const ncbPct = +ncb?.value || 0;
            const ndd = +depreciation?.value || 0;

            if (pv !== 'LIAB') {
                addSec('Own Damage');
                addRow(`Basic OD${disc>0?' (Disc: '+disc+'%)':''}`, 'odBasic', odBasic, true);
                addRow('IMT 23', 'od_imt23', odImt23);
                addRow('Inbuilt CNG / LPG OD', 'od_bifuel', odBifuel);
                addRow('External CNG / LPG OD', 'od_extcng', odExtCng);
                addRow('Electrical Fittings OD', 'od_elec', odElec);
                addRow('Additional Towing', 'od_tow', odTow);

                /* ADD-ON COVERAGES */
                addSec('Add-On Coverages');
                //addRow(`Nil Depreciation${ndd>0?' (Disc: '+ndd+'%)':''}`, 'od_nildep', odNildep);
                addRow('Consumables', 'od_consumables', odConsumables);
                addRow('Battery Protect', 'od_battery', odBattery);
                //addRow('Wall Mounted Charger', 'od_wallcharger', odWallcharger);

                /* DISCOUNTS APPLIED */
                addSec('Discounts Applied');
                addRow(`NCB Discount${ncbPct>0?' ('+ncbPct+'%)':''}`, 'od_ncb_amt', odNcb);
                addRow('Anti-Theft Discount', 'od_atd', odAtd);

                addSub('Total OD Premium', odTotalBreakdown);
            }

            addSec('Third Party / Liability');
            addRow('Basic TP', 'tpBasic', tpBasic, true);
            addRow('CPA Owner Driver', 'tp_pa_owner', tpCpaOwner);
            addRow('LL – Paid Driver / Cleaner', 'tp_llpd', tpLlpd);
            addRow('LL to NFPP', 'tp_llnfpp', tpLlnfpp);
            addRow('PA Paid Driver / Cleaner', 'tp_pa_pdc', tpPaDc);
            addRow('External CNG / LPG TP', 'tp_extcng', tpExtCng);
            addRow('Inbuilt CNG / LPG TP', 'tp_bifuel', tpBifuel);
            addRow('TPPD Discount', 'tp_tppd_disc', tpTppdDisc);
            addSub('Total TP Premium', tpTotalBreakdown);

            /* Geo ext */
            const gv = gt('geo_ext_amt');
            if (gv.replace(/[₹\s,]/g, '') !== '0') {
                const g = document.createElement('table');
                g.style.cssText = 'width:100%;border-collapse:collapse;';
                g.innerHTML = `<tr style="background:#f6f8ff;border-bottom:1px solid #cdd5ee;">
      <td style="padding:4px 16px;font-size:12px;font-weight:600;color:#1a3a8f;width:70%;">Geographical Extension</td>
      <td style="padding:4px 16px;font-size:12px;font-weight:700;color:#1a3a8f;text-align:right;">${gv}</td>
    </tr>`;
                col.appendChild(g);
            }

            /* GST */
            const gd = document.createElement('table');
            gd.style.cssText = 'width:100%;border-collapse:collapse;';
            gd.innerHTML = `<tr style="background:#fff8e8;">
    <td style="padding:6px 16px;font-size:15px;font-weight:600;color:#8a5c00;width:70%;">GST (18% OD / 5% Basic TP)</td>
    <td style="padding:6px 16px;font-size:15px;font-weight:700;color:#8a5c00;text-align:right;">${gst}</td>
  </tr>`;
            col.appendChild(gd);

            /* Grand total */
            const gr = document.createElement('div');
            gr.style.cssText = 'background:#c062c4;padding:11px 16px;display:flex;justify-content:space-between;align-items:center;';
            gr.innerHTML = `
    <span style="color:rgba(255,255,255,.75);font-size:16px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">GRAND TOTAL PREMIUM</span>
    <span style="color:#fff;font-size:20px;font-weight:700;">${grandTotal}</span>`;
            col.appendChild(gr);

            /* Disclaimer */
            /* Disclaimer */
            const dis = document.createElement('div');
            dis.className = 'p-disclaimer';

            const now = new Date().toLocaleString('en-IN');

            dis.textContent =
                'This is an indicative premium quotation based on the inputs selected. Final premium is subject to underwriting terms, conditions and applicable IRDAI regulations. For queries, contact your insurance advisor. Generated on : ' + now + '.';

            col.appendChild(dis);
        }

  async function savePDF() {
            handleCalculate();
            await new Promise(r => setTimeout(r, 300));
            console.log("Generating PDF...");
            buildPdfTarget();

            const target = document.getElementById('pdf-print-target');
            target.style.left = '0';
            target.style.top = '0';
            target.style.zIndex = '99999';
            target.style.width = '794px';
            target.style.position = 'fixed';

            await new Promise(r => setTimeout(r, 200));

            try {
                const canvas = await html2canvas(target, {
                    scale: 3, // ← scale 2 is enough
                    useCORS: true,
                    backgroundColor: '#ffffff'
                });

                // const {
                //     jsPDF
                // } = window.jspdf.jsPDF;
                const doc = new jsPDF('p', 'mm', 'a4');

                const pageW = doc.internal.pageSize.getWidth(); // 210mm
                const pageH = doc.internal.pageSize.getHeight(); // 297mm
                const mL = 10,
                    mR = 10,
                    mT = 10,
                    mB = 10;
                const availW = pageW - mL - mR; // 190mm
                const availH = pageH - mT - mB; // 277mm

                // How many canvas-pixels fit in one A4 page height?
                const canvasPageHeight = Math.floor(canvas.width * availH / availW);
                let yOffset = 0;
                let pageNum = 0;

                while (yOffset < canvas.height) {
                    const sliceH = Math.min(canvasPageHeight, canvas.height - yOffset);

                    // Create a slice canvas
                    const sliceCanvas = document.createElement('canvas');
                    sliceCanvas.width = canvas.width;
                    sliceCanvas.height = sliceH;
                    const ctx = sliceCanvas.getContext('2d');
                    ctx.drawImage(canvas, 0, yOffset, canvas.width, sliceH, 0, 0, canvas.width, sliceH);

                    const imgData = sliceCanvas.toDataURL('image/jpeg', 0.88); // JPEG, 88% quality
                    const sliceHmm = sliceH * availW / canvas.width;

                    if (pageNum > 0) doc.addPage();
                    doc.addImage(imgData, 'JPEG', mL, mT, availW, sliceHmm);

                    yOffset += sliceH;
                    pageNum++;
                }

                const nm = (proposerName || 'Quote').replace(/\s+/g, '_');
                const rg = (registrationNo || '').replace(/\s+/g, '_');
                doc.save('GCV_Premium_' + (rg || nm) + '.pdf');

            } catch (e) {
                alert("PDF Export Failed: " + e.message);
            } finally {
                const target = document.getElementById('pdf-print-target');
                target.style.position = '';
                target.style.left = '';
                target.style.top = '';
                target.style.zIndex = '';
            }
        }

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
            MOTOR PREMIUM CALCULATOR – COMMERCIAL VEHICLE
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
                    border: '3px solid #c062c4',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
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
                  <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* <Grid item xs={6} sx={{ width: '300px' }}>
                      <TextField
                        fullWidth
                        select
                        size="small"
                        label="Vehicle Type"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                      >
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="GCV">Goods Carrying Vehicle (Class - A)</MenuItem>
                        <MenuItem value="TLR">Trailers (Class - B)</MenuItem>
                        <MenuItem value="PCV">Passenger Carrying Vehicle (Class - C)</MenuItem>
                        <MenuItem value="MISC">Miscellaneous & Special Types of Vehicles (Class - D)</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sx={{ width: '300px' }}>
                      <TextField
                        fullWidth
                        select
                        size="small"
                        label="Class SubType"
                        value={classSubType}
                        onChange={(e) => setClassSubType(e.target.value)}
                      >
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="GCV">Goods Carrying Vehicle (GCV)</MenuItem>
                        <MenuItem value="PCV">Passenger Carrying Vehicle (PCV)</MenuItem>
                        <MenuItem value="MISC">Miscellaneous/Special Purpose</MenuItem>
                        <MenuItem value="3W_GC">3-Wheeler Goods</MenuItem>
                        <MenuItem value="3W_PC">3-Wheeler Passenger</MenuItem>
                      </TextField>
                    </Grid> */}
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Proposer Name (Optional)"
                        value={proposerName}
                        onChange={(e) => setProposerName(e.target.value)}
                        placeholder="e.g. ABC Transport Ltd."
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Registration No (Optional)"
                        value={registrationNo}
                        onChange={(e) => setRegistrationNo(e.target.value)}
                        placeholder="e.g. MH12AB1234"
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ width: '300px' }}>
                      <TextField
                        fullWidth
                        select
                        size="small"
                        label="Vehicle Type"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                      >
                        <MenuItem value="">-- Select --</MenuItem>
                        {/* <MenuItem value="GCV">Goods Carrying Vehicle (GCV)</MenuItem>
                        <MenuItem value="PCV">Passenger Carrying Vehicle (PCV)</MenuItem>
                        <MenuItem value="MISC">Miscellaneous/Special Purpose</MenuItem>
                        <MenuItem value="3W_GC">3-Wheeler Goods</MenuItem>
                        <MenuItem value="3W_PC">3-Wheeler Passenger</MenuItem> */}
                        <MenuItem value="A1">Other than 3W – Public [A1]</MenuItem>
                        <MenuItem value="A2">Other than 3W – Private [A2]</MenuItem>
                        <MenuItem value="A3">3W – Public [A3]</MenuItem>
                        <MenuItem value="A4">3W – Private [A4]</MenuItem>
                      </TextField>
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
                        <MenuItem value="PACK">Package (OD+TP)</MenuItem>
                        <MenuItem value="LIAB">Liability Only</MenuItem>
                        <MenuItem value="SOD">Standalone OD</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={geoExtension}
                            onChange={(e) => setGeoExtension(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Geographical Extension (SAARC Countries)"
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
                    POLICY DATES & ZONE
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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
                        <MenuItem value="zonec">Zone C</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                    VEHICLE SPECIFICATIONS
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Grid item sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(20% - 8px)' }, minWidth: { xs: '0', md: '80px' } }}>
                      <TextField
                        fullWidth
                        select
                        size="small"
                        label="Engine Type"
                        value={engineType}
                        onChange={(e) => setEngineType(e.target.value)}
                      >
                        <MenuItem value="DIESEL">Diesel</MenuItem>
                        <MenuItem value="PETROL">Petrol</MenuItem>
                        <MenuItem value="CNG">CNG</MenuItem>
                        <MenuItem value="ELECTRIC">Electric</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(20% - 8px)' }, minWidth: { xs: '0', md: '80px' } }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="GVW (Gross Vehicle Weight in kg)"
                        value={gvw}
                        onChange={(e) => setGvw(e.target.value)}
                        placeholder="e.g. 7500"
                      />
                    </Grid>
                    <Grid item sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(20% - 8px)' }, minWidth: { xs: '0', md: '80px' } }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="Carrying Capacity (in tons)"
                        value={carryingCapacity}
                        onChange={(e) => setCarryingCapacity(e.target.value)}
                        placeholder="e.g. 5"
                      />
                    </Grid>
                    <Grid item sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(20% - 8px)' }, minWidth: { xs: '0', md: '80px' } }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="Seating Capacity (including driver)"
                        value={seatingCapacity}
                        onChange={(e) => setSeatingCapacity(e.target.value)}
                        placeholder="e.g. 2"
                      />
                    </Grid>
                    <Grid item sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(20% - 8px)' }, minWidth: { xs: '0', md: '80px' } }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={trailerAttached}
                            onChange={(e) => setTrailerAttached(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Trailer Attached"
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
                    SUM INSURED DETAILS
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* Row 1: Old IDV / Depreciation */}
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
                    {/* Row 2: New IDV / IMT 23 */}
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={imt23}
                            onChange={(e) => setImt23(e.target.checked)}
                            size="small"
                          />
                        }
                        label="IMT 23 [Specified Parts]"
                        sx={{ fontSize: '0.85rem' }}
                      />
                    </Grid>
                    {/* Row 3: Electrical Fittings / Non-Elec Accessories */}
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
                        label="Non-Elec. Accessories SI (₹)"
                        value={nonElecSI}
                        onChange={(e) => setNonElecSI(e.target.value)}
                        placeholder="0"
                      />
                    </Grid>
                    {/* Row 4: Additional Towing / External CNG */}
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="Additional Towing SI (₹)"
                        value={additionalTowingSI}
                        onChange={(e) => setAdditionalTowingSI(e.target.value)}
                        placeholder="0"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="External CNG / LPG SI (₹)"
                        value={externalCngSI}
                        onChange={(e) => setExternalCngSI(e.target.value)}
                        placeholder="Min 10,000"
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
                    DISCOUNTS & NCB
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="OD Discount %"
                        value={odDiscount}
                        onChange={(e) => setOdDiscount(e.target.value)}
                        placeholder="0"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        select
                        size="small"
                        label="NCB %"
                        value={ncb}
                        onChange={(e) => setNcb(e.target.value)}
                      >
                        <MenuItem value="0">0%</MenuItem>
                        <MenuItem value="20">20%</MenuItem>
                        <MenuItem value="25">25%</MenuItem>
                        <MenuItem value="35">35%</MenuItem>
                        <MenuItem value="45">45%</MenuItem>
                        <MenuItem value="50">50%</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={antiTheftDevice}
                            onChange={(e) => setAntiTheftDevice(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Anti-Theft Device"
                        sx={{ fontSize: '0.85rem' }}
                      />
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
                    ADDITIONAL LIABILITY COVERS
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Grid item sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(20% - 8px)' }, minWidth: { xs: '0', md: '120px' }, border: '1px solid #c062c4', borderRadius: '8px', p: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={cpaOwnerDriver}
                            onChange={(e) => setCpaOwnerDriver(e.target.checked)}
                            size="small"
                          />
                        }
                        label="CPA Owner Driver"
                        sx={{ fontSize: '0.85rem' }}
                      />
                    </Grid>
                    <Grid item sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(20% - 8px)' }, minWidth: { xs: '0', md: '120px' }, border: '1px solid #c062c4', borderRadius: '8px', p: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={restrictTppd}
                            onChange={(e) => setRestrictTppd(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Restrict TPPD ₹6,000"
                        sx={{ fontSize: '0.85rem' }}
                      />
                    </Grid>
                    <Grid item sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(20% - 8px)' }, minWidth: { xs: '0', md: '120px' }, border: '1px solid #c062c4', borderRadius: '8px', p: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={llToNfpp}
                            onChange={(e) => setLlToNfpp(e.target.checked)}
                            size="small"
                          />
                        }
                        label="LL to NFPP"
                        sx={{ fontSize: '0.85rem' }}
                      />
                      {llToNfpp && (
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          label="Persons"
                          value={llToNfppCount}
                          onChange={(e) => setLlToNfppCount(e.target.value)}
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Grid>
                    <Grid item sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(20% - 8px)' }, minWidth: { xs: '0', md: '120px' }, border: '1px solid #c062c4', borderRadius: '8px', p: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={llStaff}
                            onChange={(e) => setLlStaff(e.target.checked)}
                            size="small"
                          />
                        }
                        label="LL – Staff"
                        sx={{ fontSize: '0.85rem' }}
                      />
                      {llStaff && (
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          label="Persons"
                          value={llStaffCount}
                          onChange={(e) => setLlStaffCount(e.target.value)}
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Grid>
                    <Grid item sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(20% - 8px)' }, minWidth: { xs: '0', md: '120px' }, border: '1px solid #c062c4', borderRadius: '8px', p: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={paStaff}
                            onChange={(e) => setPaStaff(e.target.checked)}
                            size="small"
                          />
                        }
                        label="PA – Staff"
                        sx={{ fontSize: '0.85rem' }}
                      />
                      {paStaff && (
                        <Box sx={{ mt: 1 }}>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                size="small"
                                type="number"
                                label="Persons"
                                value={paStaffCount}
                                onChange={(e) => setPaStaffCount(e.target.value)}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                select
                                size="small"
                                label="SI"
                                value={paStaffSI}
                                onChange={(e) => setPaStaffSI(e.target.value)}
                              >
                                <MenuItem value="0">Select</MenuItem>
                                <MenuItem value="10000">10,000</MenuItem>
                                <MenuItem value="20000">20,000</MenuItem>
                                <MenuItem value="30000">30,000</MenuItem>
                                <MenuItem value="40000">40,000</MenuItem>
                                <MenuItem value="50000">50,000</MenuItem>
                                <MenuItem value="60000">60,000</MenuItem>
                                <MenuItem value="70000">70,000</MenuItem>
                                <MenuItem value="80000">80,000</MenuItem>
                                <MenuItem value="90000">90,000</MenuItem>
                                <MenuItem value="100000">1,00,000</MenuItem>
                                <MenuItem value="110000">1,10,000</MenuItem>
                                <MenuItem value="120000">1,20,000</MenuItem>
                                <MenuItem value="130000">1,30,000</MenuItem>
                                <MenuItem value="140000">1,40,000</MenuItem>
                                <MenuItem value="150000">1,50,000</MenuItem>
                                <MenuItem value="160000">1,60,000</MenuItem>
                                <MenuItem value="170000">1,70,000</MenuItem>
                                <MenuItem value="180000">1,80,000</MenuItem>
                                <MenuItem value="190000">1,90,000</MenuItem>
                                <MenuItem value="200000">2,00,000</MenuItem>
                              </TextField>
                            </Grid>
                          </Grid>
                        </Box>
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
                    AGENT / OFFICE DETAILS <Typography component="span" sx={{ opacity: 0.6, fontSize: '0.7rem', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(Optional)</Typography>
                  </Typography>
                </Box>
                <Box sx={{ p: 2,
                  border: '3px solid #c062c4',
                  borderTop: 'none',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                 }}>
                  <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
          <Grid item xs={12} md={6} sx={{width:'100%'}}>
            <Paper sx={{ overflow: 'hidden', position: 'sticky', top: 80, boxShadow: '0 1px 8px rgba(26, 58, 143, 0.09)' }}>
              {/* Action Buttons */}
              <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCalculate}
                  sx={{
                    color: 'black',
                    background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                    '&:hover': {
                      background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Calculate
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={savePDF}
                  sx={{
                      color: 'black',
                      background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                    '&:hover': {
                      background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Print
                </Button>
              </Box>
              
              {/* Hero Amount */}
              {/* <Box
                sx={{
                  background: 'linear-gradient(135deg, #0f2460, #2952c4)',
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
                  Total Premium (Incl. GST)
                </Typography>
                <Typography
                  sx={{
                    fontSize: '2.5rem',
                    color: 'white',
                    fontWeight: 700,
                    fontFamily: '"DM Serif Display", serif',
                    letterSpacing: '-1px',
                  }}
                >
                  ₹{totalPremium.toLocaleString('en-IN')}
                </Typography>
              </Box> */}

              {/* Premium Breakdown - Two Column Layout */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #cdd5ee' }}>
                {/* OWN DAMAGE COLUMN */}
                <Box sx={{ borderRight: '1px solid #cdd5ee' }}>
                  <Box sx={{ bgcolor: '#f4f6fd', p: 1.2, borderBottom: '1px solid #cdd5ee' }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#c062c4' }}>
                      Own Damage
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>Basic OD</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{odBasic.toLocaleString('en-IN')}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>IMT 23 [Specified Parts Cover]</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{odImt23.toLocaleString('en-IN')}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>Electrical Fittings OD</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{odElec.toLocaleString('en-IN')}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>Non Electrical Accessories OD</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{odNonElec.toLocaleString('en-IN')}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>External CNG / LPG OD</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{odExtCng.toLocaleString('en-IN')}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>Additional Towing Charges</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{odTow.toLocaleString('en-IN')}</Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#f4f6fd', display: 'flex', justifyContent: 'space-between', p: 1, borderTop: '1px solid #cdd5ee', borderBottom: '1px solid #f0f2f8' }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#c062c4', letterSpacing: '1.2px', textTransform: 'uppercase' }}>Discounts</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>NCB Discount</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{odNcb.toLocaleString('en-IN')}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>Anti-Theft Discount</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{odAtd.toLocaleString('en-IN')}</Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#e8edf8', display: 'flex', justifyContent: 'space-between', p: 1, fontWeight: 700, borderTop: '1px solid #cdd5ee', borderBottom: '2px solid #cdd5ee' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>Total OD Premium</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>₹{odTotalBreakdown.toLocaleString('en-IN')}</Typography>
                  </Box>
                </Box>

                {/* LIABILITY COLUMN */}
                <Box>
                  <Box sx={{ bgcolor: '#f4f6fd', p: 1.2, borderBottom: '1px solid #cdd5ee' }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#c062c4' }}>
                      Liability
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>Basic TP</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{tpBasic.toLocaleString('en-IN')}</Typography>
                  </Box>
                  {cpaOwnerDriver && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                      <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>CPA Owner Driver</Typography>
                      <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{tpCpaOwner.toLocaleString('en-IN')}</Typography>
                    </Box>
                  )}
                  {llStaff && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                      <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>LL Paid Driver / Cleaner</Typography>
                      <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{tpLlpd.toLocaleString('en-IN')}</Typography>
                    </Box>
                  )}
                  {llToNfpp && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                      <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>LL to NFPP</Typography>
                      <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{tpLlnfpp.toLocaleString('en-IN')}</Typography>
                    </Box>
                  )}
                  {paStaff && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                      <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>PA Paid Driver / Cleaner</Typography>
                      <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{tpPaDc.toLocaleString('en-IN')}</Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>External CNG / LPG TP</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{tpExtCng.toLocaleString('en-IN')}</Typography>
                  </Box>
                  {restrictTppd && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f2f8' }}>
                      <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>TPPD Discount</Typography>
                      <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1f36' }}>₹{tpTppdDisc.toLocaleString('en-IN')}</Typography>
                    </Box>
                  )}
                  <Box sx={{ bgcolor: '#e8edf8', display: 'flex', justifyContent: 'space-between', p: 1, fontWeight: 700, borderTop: '1px solid #cdd5ee', borderBottom: '2px solid #cdd5ee' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>Total TP Premium</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: '#c062c4' }}>₹{tpTotalBreakdown.toLocaleString('en-IN')}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Geographical Extension (Conditional) */}
              {geoExtAmt > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.2, bgcolor: '#f6f8ff', fontWeight: 600, borderBottom: '1px solid #cdd5ee', color: '#c062c4', fontSize: '1rem' }}>
                  <span>Geographical Extension</span>
                  <span>₹ {geoExtAmt.toLocaleString('en-IN')}</span>
                </Box>
              )}

              {/* GST Line */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1.2, bgcolor: '#fff8e8', fontWeight: 600, borderBottom: '1px solid #f0f2f8', color: '#8a5c00' }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>GST (18% OD + 5% Basic TP)</Typography>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>₹{gst.toLocaleString('en-IN')}</Typography>
              </Box>

              {/* Grand Total Bar */}
              <Box sx={{ background: 'linear-gradient(10deg, #c062c4, #eef1f9)', p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
                  GRAND TOTAL PREMIUM
                </Typography>
                <Typography sx={{ fontSize: '1.18rem', fontWeight: 700, fontFamily: '"DM Serif Display", serif', color: 'black' }}>
                  ₹{totalPremium.toLocaleString('en-IN')}
                </Typography>
              </Box>

            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      {/* <Box
        sx={{
          background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
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
      <Box id="pdf-print-target"></Box>
    </Box>
  );
}
