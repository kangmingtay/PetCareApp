SELECT cname, email, COALESCE(days, 0) AS pet_days, COALESCE(salary, 0) salary, COALESCE(revenue, 0) revenue, rating
FROM
    (SELECT cname, email, rating
    FROM care_takers C LEFT JOIN accounts A ON C.cname = A.username
    ORDER BY username ASC) AS rating

NATURAL LEFT JOIN

(SELECT cname, SUM(pet_count) AS days
FROM schedule
WHERE EXTRACT(MONTH FROM date) = 10
    AND EXTRACT(YEAR FROM date) = 2021
GROUP BY cname)
AS pet_days

NATURAL LEFT JOIN

(SELECT cname, SUM(payment_amt / (end_date - start_date + 1)) revenue,
    CASE
        WHEN cname IN (SELECT cname FROM part_timer) THEN SUM(payment_amt / (end_date - start_date + 1)) * 0.75
        WHEN cname IN (SELECT cname FROM full_timer) AND COUNT(*) <= 60 THEN 3000
        WHEN cname IN (SELECT cname FROM full_timer) THEN 3000.0 + 1.0 * (COUNT(*) - 60) / COUNT(*) * SUM(payment_amt / (end_date - start_date + 1)) * 0.8
    END salary
FROM schedule NATURAL LEFT JOIN bids 
WHERE date <= end_date AND date >= start_date AND is_selected
GROUP BY cname, to_char(date, 'MM-YYYY')
HAVING to_char(date, 'MM-YYYY') = '10-2021'
) AS revenue;



SELECT cname, COALESCE(salary, 0) salary, COALESCE(revenue, 0) revenue
FROM care_takers NATURAL LEFT JOIN (