const express = require("express")
const axios = require("axios")
const router = express.Router()

const base_url = "http://localhost:4440/"

router.get("/:username",(req, res) => {

    const { category, start_date, end_date } = req.query


    return axios.get(base_url+"expenses",{
        "params":{
            category:category,
            date_gte:start_date,
            date_lte:end_date
        },
        "headers":{

        }
    })
    .then(resData => {
        return res.status(200).send({
            message:"expenses successfully fetch",
            data:resData.data
        })
    })
    .catch(err => {
        return res.status(500).send({
            message:"expenses fetch error : "+err.message,
            data:{}
        })
    })
})

router.get("/:id",async (req, res) => {

    const { id } = req.params

    console.log("id => ",id)

    try {
        const expenseDetail = await axios.get(base_url+"expenses/"+id)

        return res.status(200).send({
            message:"expense detail successfully fetchs",
            data:expenseDetail.data
        })

    } catch(err) { 
        return res.status(500).send({
            message:"expense detail error : "+err.message,
            data:{}
        })
    }
    
})

router.post("/",async (req, res) => {

    const { name, nominal, category } = req.body

    try { 
        const expenseAdd = await axios.post(base_url+"expenses", { 
            name, nominal, category
        })

        return res.status(200).send({
            message:"new expense successfully created",
            data:expenseAdd.data
        })

    } catch(err) {
        return res.status(500).send({
            message:"expense detail error : "+err.message,
            data:{}
        })
    }

})

router.delete("/:id",async (req, res) => {

    const { id } = req.params

    try { 
        const expense = await axios.delete(base_url+"expenses/"+id)

        return res.status(200).send({
            message:"expense successfully deleted",
            data:expense.data
        })

    } catch(err) {
        return res.status(500).send({
            message:"expense detail error : "+err.message,
            data:{}
        })
    }

})

router.put("/:id",async (req, res) => {

    const { id } = req.params
    const { name, nominal, category} = req.body

    try { 
        const expense = await axios.put(base_url+"expenses/"+id,{
            name, nominal, category
        })

        return res.status(200).send({
            message:"expense successfully updated",
            data:expense.data
        })

    } catch(err) {
        return res.status(500).send({
            message:"expense detail error : "+err.message,
            data:{}
        })
    }

})

module.exports = router
