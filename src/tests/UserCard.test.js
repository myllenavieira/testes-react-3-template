import { render, screen, waitFor } from "@testing-library/react"
import UserCard from "../components/UserCard"
import axios from "axios"

jest.mock("axios")

const axiosResponseMock = {
    data: {
        firstName: "Myllena",
        lastName: "Vieira",
        bank: {
            cardNumber: "1111222233334444",
            cardExpire: "12/23"
        }
    }
}

describe("userCard", () => {

    test("testar o render", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<UserCard />)
        
        screen.debug()
        await waitFor(() => {})
        screen.debug()
    })

    test("renderiza inicialmente o loading", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<UserCard />)

        const loading = screen.getByText(/loading\.\.\./i)

        expect(loading).toBeInTheDocument()
        expect(screen.queryByText(/oleta/i)).not.toBeInTheDocument()

        await waitFor(() => {})
    })

    test("renderiza o cartão corretamente após o loading", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<UserCard />)

        await waitFor(() => {
            const name = screen.getByText(/Myllena Vieira/i)
            const bankName = screen.getByText(/labebank/i)
            const cardNumber = screen.getByText(/1111 2222 3333 4444/i)
            const cardExpire = screen.getByText(/12\/23/i)
            const cvv = screen.getByText(/\*\*\*/i)

            expect(name).toBeInTheDocument()
            expect(bankName).toBeInTheDocument()
            expect(cardNumber).toBeInTheDocument()
            expect(cardExpire).toBeInTheDocument()
            expect(cvv).toBeInTheDocument()
        })
    })
})