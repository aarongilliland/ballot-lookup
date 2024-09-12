DROP MATERIALIZED VIEW vw_ballotids_households;
CREATE MATERIALIZED VIEW IF NOT EXISTS vw_ballotids_households
AS
SELECT 
  CONCAT_WS(' ',
	  NULLIF(h.text_res_address_nbr,''),
	  NULLIF(h.text_res_address_nbr_suffix,''),
	  NULLIF(h.cde_street_dir_prefix,''),
	  NULLIF(h.text_street_name,''),
	  NULLIF(h.cde_street_type,''),
	  NULLIF(h.cde_street_dir_suffix,''),
	  NULLIF(h.cde_res_unit_type,''),
	  NULLIF(h.text_res_unit_nbr,''),
	  NULLIF(h.text_res_city,''),
	  NULLIF(h.cde_res_state,''),
	  NULLIF(h.text_res_zip5,'')
	  )
  	as household_address,
	  b.ballotid,
	  h.precinct_part_text_name,
	  h.polling_place_text_name,
  CONCAT_WS(' ',
  	-- trim(regexp_replace(col_name, '\s+', ' ', 'g'))
	  trim(regexp_replace(h.polling_place_text_address1, '\s+', ' ', 'g'),''),
	  trim(regexp_replace(h.polling_place_text_address2, '\s+', ' ', 'g'),''),
	  trim(regexp_replace(h.polling_place_text_address3, '\s+', ' ', 'g'),''),
	  trim(regexp_replace(h.polling_place_text_address4, '\s+', ' ', 'g'),''),
	  NULLIF(h.polling_place_text_city,''),
	  NULLIF(h.polling_place_cde_state,''),
	  NULLIF(h.polling_place_text_zip5,'')
	  )
  	as precinct_address
FROM 
  households as h
RIGHT JOIN ballotids as b 
  ON h.precinct_part_text_name = b.precinct_split;

-- SELECT * FROM public.vw_ballotids_households
-- WHERE
--  household_address ILIKE '%1%'
