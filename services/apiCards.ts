import { apiHandler } from "lib/apiHandler";
import { APIFilters, filtersToQuery } from "helpers/filters";

const getToken = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const tokenRes = await apiHandler("auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return tokenRes.tokens;
  } catch (err: any) {
    if (err.message.includes("Unexpected token")) {
      throw new Error("Something went wrong. Please try again.");
    }

    throw new Error(err);
  }
};

const getUserInfo = async (token: string) => {
  const userInfoRes = await apiHandler("users/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return userInfoRes;
};

const registerUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const tokenRes = await apiHandler("auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
    return tokenRes.tokens;
  } catch (err: any) {
    if (err.message.includes("Unexpected token")) {
      throw new Error("Something went wrong. Please try again.");
    }

    throw new Error(err);
  }
};

const getCards = async (token: string, filters?: APIFilters) => {
  let filtersQuery;
  if (filters) filtersQuery = filtersToQuery(filters);
  const cardsRes = await apiHandler(
    `cards${filtersQuery !== undefined ? `?${filtersQuery}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return cardsRes;
};

export { getToken, getCards, registerUser, getUserInfo };
