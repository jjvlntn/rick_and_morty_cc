import Head from "next/head"

export const Layout = ({title, description, children}: {title: string, description: string, children: any}) => {
    return(
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}></meta>
            </Head>
            {children}
        </>
    )
}

