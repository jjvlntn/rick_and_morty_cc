import { Header } from "../components/Header/Header"
import { Layout } from "../components/Layout/Layout"

const NotFoundPage = () => {
    return (
        <Layout
            title="NOT FOUND"
            description="NOT FOUND"
        >
            <Header />
            <div className="flex justify-center items-center w-screen h-72">
                <h1 className="text-lg text-red-600">Sorry, we could not find the data you are looking for!</h1>
            </div>
        </Layout>
    )
} 

export default NotFoundPage