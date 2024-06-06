import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, GridColumn, Header, Loader, Segment, Image, List, ListItem, Label, ListHeader } from "semantic-ui-react";
// import { fetchMovies } from "./query";


export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Movie database</h2>}
        >
            <div>

            </div>
        </AuthenticatedLayout>
    );
}
