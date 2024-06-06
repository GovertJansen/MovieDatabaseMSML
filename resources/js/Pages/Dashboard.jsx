import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, GridColumn, Header, Loader, Segment, Image, List, ListItem, Label, ListHeader } from "semantic-ui-react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
        </AuthenticatedLayout>
    );
}
