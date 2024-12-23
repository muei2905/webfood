import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { categorizeIngredient } from '../Util/categorizeingredient';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();
  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      jwt: localStorage.getItem('jwt'),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData))
  };

  const handleChange = (ingredientName) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== ingredientName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="lg:flex items-center justify-between">
            <div className="lg:flex items-center lg:gap-5">
              <img
                className="w-[7rem] h-[7rem] object-cover"
                src={item.images[0]}
                alt=""
              />
              <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">{item.name}</p>
                <p>${item.price}</p>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart}>
            <div className="flex gap-5 flex-wrap">
              {Object.keys(categorizeIngredient(item.ingredients)).map((category) => (
                <FormControl component="fieldset" key={category} sx={{ mb: 2 }}>
                  <p>{category}</p>
                  <FormGroup>
                    {categorizeIngredient(item.ingredients)[category].map((ingredient) => (
                      <FormControlLabel
                        key={ingredient.id}
                        control={
                          <Checkbox
                            checked={selectedIngredients.includes(ingredient.name)}
                            onChange={() => handleChange(ingredient.name)}
                          />
                        }
                        label={ingredient.name}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              ))}
            </div>
            <div className="pt-5">
              <Button type="submit" disabled={false} variant="contained">
                {true ? 'Add To Cart' : 'Out Of Stock'}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MenuCard;
