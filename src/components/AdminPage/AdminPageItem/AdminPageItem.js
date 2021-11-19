
import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';



//Material-ui
import { Button, Card, Paper, makeStyles, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
  
function AdminPageItem({sessionInfo}){


//set selector
const reduxStore = useSelector((store) => store);
const dispatch = useDispatch();


    return (
        <>
    
  
    </>

    )
}


export default AdminPageItem;