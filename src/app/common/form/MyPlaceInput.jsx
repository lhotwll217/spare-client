import {useField} from "formik";
import React, {useState} from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {FormField, Label} from "semantic-ui-react";

export default function MyPlaceInput({...props}) {
  const [field, meta, helpers] = useField(props);

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => helpers.setValue({address, latLng}))
      .catch((error) => console.error("Error", error));
  }
  // Shares Formik onBlue while also setting the value to to empty strings if a location was not selected
  function handleBlur(e) {
    field.onBlur(e);
    if (!field.value.latLng) {
      helpers.setValue({address: "", latLng: null});
    }
  }

  return (
    <PlacesAutocomplete
      value={field.value["address"]}
      onChange={(value) => helpers.setValue({address: value})}
      onSelect={(value) => handleSelect(value)}
    >
      {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
        <FormField error={meta.touched && !!meta.error}>
          <input
            {...getInputProps({
              name: field.name,
              onBlur: (e) => handleBlur(e),
              ...props,
            })}
          />

          {meta.touched && !!meta.error ? (
            <Label basic color='red'>
              {meta.error["address"]}
            </Label>
          ) : null}
          <div
            style={{borderRadius: 3}}
            lassName='autocomplete-dropdown-container'
          >
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? {backgroundColor: "#fafafa", cursor: "pointer"}
                : {backgroundColor: "#ffffff", cursor: "pointer"};
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={suggestion.placeId}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </FormField>
      )}
    </PlacesAutocomplete>
  );
}
