import axios from "axios";
import { render, screen, waitFor } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

jest.mock("axios");

const axiosResponseMock = {
    data: {
        "id": 6,
        "title": "MacBook Pro",
        "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
        "price": 1749,
        "thumbnail": "https://i.dummyjson.com/data/products/6/thumbnail.png"
    }
}

describe("ProductCard", () => {
    beforeEach(() => {
        axios.mockReset()
    })

    test("Deve renderizar o componente ProductCard", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock);

        render(<ProductCard />)

        screen.debug()
        await waitFor(() => { })
        screen.debug()
    })
    test("Deve renderizar 'loading...' inicialmente", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock);

        render(<ProductCard />)

        // const loading = screen.getByText(/loading\.\.\./i)
        const loading = screen.getByText("Loading...")
        expect(loading).toBeInTheDocument()

        await waitFor(() => { })
    })
    test("Deve renderizar o título, imagem, preço e descrição, sem o loading", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock);

        render(<ProductCard />)

        await waitFor(() => {
            const title = screen.getByRole("heading", { name: /macbook pro/i })
            const img = screen.getByRole("img", { name: /thumbnail for macbook pro/i })
            const description = screen.getByText(/macbook pro 2021 with mini\-led display may launch between september, november/i)
            const price = screen.getByText(/\$1749/i)

            expect(title).toBeInTheDocument()
            expect(img).toBeInTheDocument()
            expect(description).toBeInTheDocument()
            expect(price).toBeInTheDocument()
        })
        expect(screen.queryByText(/loading\.\.\./i)).not.toBeInTheDocument()

    })
})