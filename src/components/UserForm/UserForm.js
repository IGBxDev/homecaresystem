import React, { useContext, useEffect, useState } from "react"
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  CardActions,
  Button,
  CardHeader,
  FormControl,
} from "@material-ui/core"

import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { TextField } from "formik-material-ui"
import { ProfessionalBlocked, Specialty }  from '../../services/lists'
import { getCEP } from '../../services/api'
import { GlobalStateContext } from "../../contexts/GlobalStateContext"
import useForm from "../../hooks/useForm"
import { ProfessionalContext } from "../../contexts/professional"

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

//Data
// const initialValues = {
//   firstName: "",
//   lastName: "",
//   especialy: "",
//   address: "",
//   city: "",
//   uf: "",
//   email: "",
//   phone: "",
//   cpf: "",
//   bordNumber: "", //Número do Conselho
//   bank: "",
//   agency: "",
//   regioServes: "",
//   professionalBlocked: "",
//   cep: ""
// }

//password validation
const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/

//validation schema
let validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  // password: Yup.string()
  //   .matches(
  //     lowercaseRegEx,
  //     "Must contain one lowercase alphabetical character!"
  //   )
  //   .matches(
  //     uppercaseRegEx,
  //     "Must contain one uppercase alphabetical character!"
  //   )
  //   .matches(numericRegEx, "Must contain one numeric character!")
  //   .matches(lengthRegEx, "Must contain 6 characters!")
  //   .required("Required!"),
})

const UserForm = ({formulario}) => {
  const classes = useStyle()
  const [cep, setCep] = useState('')
  const [load, setLoad] = useState(false)
  const [form, handleInputChange, clear] = useForm({
    firstName: "",
    lastName: "",
    especialy: "",
    address: "",
    city: "",
    uf: "",
    email: "",
    phone: "",
    cpf: "",
    bordNumber: "", //Número do Conselho
    bank: "",
    agency: "",
    regioServes: "",
    professionalBlocked: "",
    cep: "",
    number: "",
    complement: "",
    neighborhood: ""
  })

  //Global context
  const { states, setters } = useContext(GlobalStateContext)
  const { setDataCEP, setIsLoading } = setters
  const { dataCEP, isLoading } = states


  //context professional
  const { saveProfessional } = useContext(ProfessionalContext)

  const onSubmit = (values) => {
    console.log("onSubmit",values)
    saveProfessional(values)
  }

  // A props values contém todos os campos do formulário
  // a cada input realizado é exibido o valor
  const validate = (values) =>{
    if(values.cep.length === 8){
      setCep(values.cep)
    }
  }

  useEffect(()=>{
    if(cep.length === 8){
      setLoad(false)
      getCEP(cep, setDataCEP, setIsLoading)

      if(!isLoading){
        console.log("isloading", dataCEP)
        setLoad(true)
        console.log("initialValues", form)
      }

    }   
  },[cep])



  return (<>
    <Grid container justify="center" spacing={1}>
      <Grid item md={6}>
        <Card className={classes.padding}>
              <CardHeader title="Formulário de cadastro"></CardHeader>
          <Formik
            enableReinitialize={load}
            validate={validate} 
            initialValues={form}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              
              return (
                <Form>
                  <CardContent>

                    {formulario === 'profissional'? (
                    <Grid item container spacing={1} justify="center">
                      <Grid item xs={12} sm={6} md={6} >
                        <Field
                          label="Nome"
                          variant="outlined"
                          fullWidth
                          name="firstName"
                          value={values.firstName}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Sobre Nome"
                          variant="outlined"
                          fullWidth
                          name="lastName"
                          value={values.lastName}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="CEP"
                          variant="outlined"
                          fullWidth
                          name="cep"
                          value={values.cep}
                          component={TextField}
                          
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Endereço"
                          variant="outlined"
                          fullWidth
                          name="address"
                          value={values.address}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={1} md={1}>
                        <Field
                          label="Nº"
                          variant="outlined"
                          fullWidth
                          name="number"
                          value={values.number}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={5} md={5}>
                        <Field
                          label="Complemento"
                          variant="outlined"
                          fullWidth
                          name="complement"
                          value={values.complement}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={1} md={1}>
                        <Field
                          label="UF"
                          variant="outlined"
                          fullWidth
                          name="uf"
                          value={values.uf}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={5} md={5}>
                        <Field
                          label="Cidade"
                          variant="outlined"
                          fullWidth
                          name="city"
                          value={values.city}
                          component={TextField}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Bairro"
                          variant="outlined"
                          fullWidth
                          name="neighborhood"
                          value={values.neighborhood}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="E-mail"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={values.email}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Telefone"
                          variant="outlined"
                          fullWidth
                          name="phone"
                          value={values.phone}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="CPF"
                          variant="outlined"
                          fullWidth
                          name="cpf"
                          value={values.cpf}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Número do Conselho"
                          variant="outlined"
                          fullWidth
                          name="bordNumber"
                          value={values.bordNumber}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Banco"
                          variant="outlined"
                          fullWidth
                          name="bank"
                          value={values.bank}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Agência"
                          variant="outlined"
                          fullWidth
                          name="agency"
                          value={values.agency}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Região que atende"
                          variant="outlined"
                          fullWidth
                          name="regioServes"
                          value={values.regioServes}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Especialidade
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Especialidade"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.especialy}
                            name="especialy">
                            {/* <MenuItem>None</MenuItem> */}
                            {Specialty.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Bloqueio de Profissional
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Bloqueio de Profissional"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.professionalBlocked}
                            name="professionalBlocked">
                            {/* <MenuItem>None</MenuItem> */}
                            {ProfessionalBlocked.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    ) : ('paciente') }
                  </CardContent>
                  <CardActions>
                    <Button
                      disabled={!dirty || !isValid}
                      variant="contained"
                      color="primary"
                      type="Submit"
                      className={classes.button}>
                      REGISTRAR
                    </Button>
                  </CardActions>
                </Form>
              )
            }}
          </Formik>
        </Card>
      </Grid>
    </Grid>
    </>)
}

export default UserForm
