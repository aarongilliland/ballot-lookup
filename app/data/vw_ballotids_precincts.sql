DROP MATERIALIZED VIEW vw_ballotids_households;
CREATE MATERIALIZED VIEW IF NOT EXISTS vw_ballotids_households
AS
SELECT 
  h.text_res_address_nbr ||
  h.text_res_address_nbr_suffix || ' ' || 
  h.cde_street_dir_prefix || ' ' || 
  h.text_street_name || ' ' || 
  h.cde_street_type || ' ' || 
  h.cde_street_dir_suffix || ' ' || 
  h.cde_res_unit_type || ' ' || 
  h.text_res_unit_nbr || ' ' || 
  h.text_res_city || ' ' || 
  h.cde_res_state || ' ' || 
  h.text_res_zip5 as household_address,
  b.ballotid,
  h.precinct_part_text_name,
  h.polling_place_text_name, 
  h.polling_place_text_address1 || ' ' || 
  h.polling_place_text_address2 || ' ' || 
  h.polling_place_text_address3 || ' ' || 
  h.polling_place_text_address4 || ' ' || 
  h.polling_place_text_city || ' ' || 
  h.polling_place_cde_state || ' ' || 
  h.polling_place_text_zip5 as precinct_address
FROM 
  households as h
RIGHT JOIN ballotids as b 
  ON h.precinct_part_text_name = b.precinct_split;

-- SELECT * FROM public.vw_ballotids_households
-- WHERE
--  household_address ILIKE '%1  Wurtsmith%'
