import {useField} from "formik";
import React, {useState} from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function MyPlaceInput({...props}) {
  const [field, meta, helpers] = useField(props);

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => helpers.setValue({address, latLng}))
      .catch((error) => console.error("Error", error));
  }

  return (
    <PlacesAutocomplete
      value={field.value["address"]}
      onChange={(value) => helpers.setValue({address: value})}
      onSelect={(value) => handleSelect(value)}
    >
      {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
        <div>
          <input
            {...getInputProps({
              name: field.name,
              ...props,
            })}
          />
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
        </div>
      )}
    </PlacesAutocomplete>
  );
}
