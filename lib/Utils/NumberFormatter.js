/*
 Created by Nandi at 2016/10/27
 */

function truncate(value , decimal)
{
    return parseFloat(value.toFixed(decimal))
}

const DEFAULT_DECIMAL = 2;
module.exports = {
    truncate : truncate,
    DEFAULT_DECIMAL : DEFAULT_DECIMAL
};