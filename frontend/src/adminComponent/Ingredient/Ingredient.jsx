import { Grid } from '@mui/material'
import React from 'react'
import IngredientTable from './IngredientTable'
import IngredientCategoryTable from './IngredientCategoryTable'

const Ingredient = () => {
  return (
    <div className='px-2'><Grid container spacing={2}>
    <Grid item xs={12} md={8}>
      <IngredientTable />
    </Grid>
    <Grid item xs={12} md={4}>
      <IngredientCategoryTable />
    </Grid>
  </Grid></div>
  )
}

export default Ingredient